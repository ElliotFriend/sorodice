import { rpcUrl, networkPassphrase } from '$lib/contracts/util'
import { sleep } from './utils'
import { error } from '@sveltejs/kit'

import {
    BASE_FEE,
    Operation,
    Transaction,
    TransactionBuilder,
    FeeBumpTransaction,
    SorobanRpc,
    xdr,
} from '@stellar/stellar-sdk'

export const server = new SorobanRpc.Server(rpcUrl)

/**
 * Submits a transaction and then polls for its status until a timeout is reached.
 * @param {Transaction | FeeBumpTransaction | string} tx transaction to submit to the network
 * @returns {Promise<SorobanRpc.Api.GetTransactionResponse>}
 */
export async function yeetTx(tx) {
    if (typeof tx === "string") {
        tx = TransactionBuilder.fromXDR(tx, networkPassphrase)
    }
    return server.sendTransaction(tx).then(async (reply) => {
        if (reply.status !== 'PENDING') {
            return error(500, `Transaction submission failed with status: ${reply.status}`)
        }

        let status
        let attempts = 0
        outside:
        while (attempts++ < 5) {
            let tmpStatus = await server.getTransaction(reply.hash)
            // console.log(`checking tx status. attempt number ${attempts}`)
            // console.log('current tmpStatus', tmpStatus)
            switch (tmpStatus.status) {
                case 'SUCCESS': {
                    status = tmpStatus
                    break outside
                }
                case 'FAILED': {
                    return error(500, `Transaction submission failed: ${tmpStatus.resultMetaXdr.toXDR('base64')}`)
                }
                case 'NOT_FOUND': {
                    await sleep(2500)
                    continue
                }
            }
            // tmpStatus = await server.getTransaction(reply.hash)
        }

        if (attempts >= 5 || !status) {
            return error(500, `Failed to find transaction ${reply.hash} in time.`)
        }

        return status
    })
}

/**
 * Simulate (but not prepare) a provided transaction
 * @param {Transaction | FeeBumpTransaction} tx transaction to simulate using RPC
 * @returns {Promise<SorobanRpc.Api.SimulateTransactionResponse>}
 */
export async function simulateTx(tx) {
    return server.simulateTransaction(tx)
}

/**
 * Simulate and prepare a provided transaction getting it ready to submit.
 * @param {Transaction | FeeBumpTransaction} tx transaction to simulate using RPC
 * @returns {Promise<Transaction>}
 */
export async function prepareTx(tx) {
    return server.prepareTransaction(tx)
}

/**
 * Build and return a transaction to invoke the `roll` function of the smart contract
 * @param {Object} opts Options object
 * @param {number} opts.numDice number of dice to roll
 * @param {number} opts.numFaces number of faces on each die
 * @param {string} opts.publicKey public key of the transaction's source account
 * @returns {Promise<Transaction>}
 */
export async function buildRollTx({ numDice, numFaces, publicKey }) {
    const account = await server.getAccount(publicKey)
    return new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: networkPassphrase,
    })
        .addOperation(
            Operation.invokeContractFunction({
                contract: 'CC2OIY5VDRKABZILZLWGMVBROOWYEFWKIC6YPHGWC3Z4HBM2LXYVPJ7C',
                function: 'roll',
                args: [xdr.ScVal.scvU32(numDice), xdr.ScVal.scvU32(numFaces)],
            }),
        )
        .setTimeout(60)
        .build()
}
