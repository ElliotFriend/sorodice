import { PRIVATE_BLOCKEDEN_URL } from '$env/static/private'
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

    let { events } = await request(PRIVATE_BLOCKEDEN_URL, document)
    return {
        /** @type {Array.<import('$lib/typedefs').ContractEvent>} */
        events,
    };
};
