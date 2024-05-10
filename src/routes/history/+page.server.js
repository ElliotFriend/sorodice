import { PRIVATE_BLOCKEDEN_API_KEY } from '$env/static/private'
import { gql, request } from 'graphql-request'
import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const document = gql`
        {
            events(
                where: {
                    _and:[
                        {contract_id:{_eq:"${PUBLIC_CONTRACT_ADDRESS}"}}
                        {in_successful_contract_call:{_eq:true}}
                    ]
                }
                order_by: {created_at:desc}
            ) {
                topic
                value
            }
        }
    `

    const graphqlUrl = `https://api.blockeden.xyz/stellar/testnet/soroban/indexer/${PRIVATE_BLOCKEDEN_API_KEY}/v1/graphql`
    let { events } = await request(graphqlUrl, document)
    return {
        /** @type {Array.<import('$lib/typedefs').ContractEvent>} */
        events,
    }
}
