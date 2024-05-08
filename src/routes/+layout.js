import { rpcUrl } from '../contracts/util'
import { networks } from 'sorodice_contract'
import { Address, SorobanRpc, xdr } from '@stellar/stellar-sdk'

/** @type {import('./$types').LayoutLoad} */
export async function load() {
    // Get and decode the contract instance ledger entry to find the `Admin` data entry.
    const server = new SorobanRpc.Server(rpcUrl, { allowHttp: true })
    const result = await server.getContractData(
        networks.standalone.contractId,
        xdr.ScVal.scvLedgerKeyContractInstance(),
        SorobanRpc.Durability.Persistent,
    )
    // SURELY THERE HAS TO BE A BETTER WAY!!
    const adminAddress = Address.fromScVal(
        result.val
            .contractData()
            .val()
            .instance()
            ?.storage()
            ?.find((v) => Buffer.from(v.key().value()[0].value()).toString('utf-8') === 'Admin')
            ?.val(),
    ).toString('utf-8')

    return {
        contractAdmin: adminAddress,
        // contractAdmin: 'GA4SFUNCB6IL6I2ZKBPLMK5KJKTB5B24BI5ABCIKUUYW7CQC24TDKOMK'
    }
}
