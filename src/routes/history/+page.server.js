import { PRIVATE_BLOCKEDEN_API_KEY } from '$env/static/private'
import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public'

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    console.log('i should only run in the backend, i think?')
    const document = {
        "query": `{ events( where: { _and: [ { contract_id: { _eq: \"${PUBLIC_CONTRACT_ADDRESS}\" } } { in_successful_contract_call: { _eq: true } } ] } order_by: { created_at: desc } ) { topic value }}`
    }

    const graphqlUrl = `https://api.blockeden.xyz/stellar/testnet/soroban/indexer/${PRIVATE_BLOCKEDEN_API_KEY}/v1/graphql`

    let { data: { events } } = await fetch(graphqlUrl, {
        method: 'POST',
        body: JSON.stringify(document),
    }).then(async (res) => {
        if (res.ok)
            return res.json()
        else {
            console.log(await res.json());
            throw new Error('Failed to fetch')
        }
    })

    return {
        /** @type {Array.<import('$lib/typedefs').ContractEvent>} */
        events,
    }
}
