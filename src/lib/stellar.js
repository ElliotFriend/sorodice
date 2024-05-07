import { PUBLIC_SOROBAN_RPC_URL, PUBLIC_SOROBAN_NETWORK_PASSPHRASE } from '$env/static/public'
import { sleep } from './utils'

import {
    BASE_FEE,
    Operation,
    Transaction,
    TransactionBuilder,
    FeeBumpTransaction,
    ScInt,
    SorobanRpc,
    xdr,
} from "@stellar/stellar-sdk";

export const server = new SorobanRpc.Server(PUBLIC_SOROBAN_RPC_URL, {allowHttp: true});

/**
 * Submits a transaction and then polls for its status until a timeout is reached.
 * @param {Transaction | FeeBumpTransaction} tx transaction to submit to the network
 * @returns {Promise<SorobanRpc.Api.GetTransactionResponse>}
 */
export async function yeetTx( tx ) {
  return server.sendTransaction(tx).then(async (reply) => {
    if (reply.status !== "PENDING") {
      throw reply;
    }

    let status;
    let attempts = 0;
    while (attempts++ < 5) {
      const tmpStatus = await server.getTransaction(reply.hash);
      switch (tmpStatus.status) {
        case "FAILED":
          throw tmpStatus;
        case "NOT_FOUND":
          await sleep(500);
          continue;
        case "SUCCESS":
          status = tmpStatus;
          break;
      }
    }

    if (attempts >= 5 || !status) {
      throw new Error(`Failed to find transaction ${reply.hash} in time.`);
    }

    return status;
  });
}

/**
 * Simulate (but not prepare) a provided transaction
 * @param {Transaction | FeeBumpTransaction} tx transaction to simulate using RPC
 * @returns {Promise<SorobanRpc.Api.SimulateTransactionResponse>}
 */
export async function simulateTx( tx ) {
    return server.simulateTransaction(tx)
}

/**
 * Simulate and prepare a provided transaction getting it ready to submit.
 * @param {Transaction | FeeBumpTransaction} tx transaction to simulate using RPC
 * @returns {Promise<Transaction>}
 */
export async function prepareTx( tx ) {
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
        networkPassphrase: PUBLIC_SOROBAN_NETWORK_PASSPHRASE,
    })
    .addOperation(Operation.invokeContractFunction({
        contract: 'CC2OIY5VDRKABZILZLWGMVBROOWYEFWKIC6YPHGWC3Z4HBM2LXYVPJ7C',
        function: "roll",
        args: [
            xdr.ScVal.scvU32(numDice),
            xdr.ScVal.scvU32(numFaces)
        ],
    }))
    .setTimeout(60)
    .build()
}
