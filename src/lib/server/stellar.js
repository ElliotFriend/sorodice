import { PRIVATE_BLOCKEDEN_API_KEY } from '$env/static/private'
import { PUBLIC_SOROBAN_NETWORK_PASSPHRASE } from '$env/static/public'
import { sleep } from '$lib/utils'
import { error } from '@sveltejs/kit'

import {
    Transaction,
    TransactionBuilder,
    FeeBumpTransaction,
    SorobanRpc,
} from '@stellar/stellar-sdk'

const rpcUrl = `https://api.blockeden.xyz/stellar/testnet/soroban/${PRIVATE_BLOCKEDEN_API_KEY}/`
const server = new SorobanRpc.Server(rpcUrl)

/**
 * Submits a transaction and then polls for its status until a timeout is reached.
 * @param {Transaction | FeeBumpTransaction | string} tx transaction to submit to the network
 * @returns {Promise<SorobanRpc.Api.GetTransactionResponse>}
 */
export async function yeetTx(tx) {
    if (typeof tx === 'string') {
        tx = TransactionBuilder.fromXDR(tx, PUBLIC_SOROBAN_NETWORK_PASSPHRASE)
    }
    return server.sendTransaction(tx).then(async (reply) => {
        if (reply.status !== 'PENDING') {
            return error(500, `Transaction submission failed with status: ${reply.status}`)
        }

        let status
        let attempts = 0
        outside: while (attempts++ < 5) {
            let tmpStatus = await server.getTransaction(reply.hash)
            switch (tmpStatus.status) {
                case 'SUCCESS': {
                    status = tmpStatus
                    break outside
                }
                case 'FAILED': {
                    return error(
                        500,
                        `Transaction submission failed: ${tmpStatus.resultMetaXdr.toXDR('base64')}`,
                    )
                }
                case 'NOT_FOUND': {
                    await sleep(2500)
                    continue
                }
            }
        }

        if (attempts >= 5 || !status) {
            return error(500, `Failed to find transaction ${reply.hash} in time.`)
        }

        return status
    })
}
