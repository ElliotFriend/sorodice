import { fail } from '@sveltejs/kit'

import sorodiceContract from '../../contracts/sorodice_contract'
// import { buildRollTx, simulateTx, prepareTx } from '$lib/stellar'

/** @type {import('./$types').Actions} */
export const actions = {
    simulate: async ({ request }) => {
        const data = await request.formData()
        const numDice = data.get('numDice')
        const numFaces = data.get('numFaces')
        const userPublicKey = data.get('userPublicKey')
        if (userPublicKey) {
            sorodiceContract.options.publicKey = userPublicKey.toString()
        }

        if (!numDice || parseInt(numDice.toString()) > 255) {
            return fail(400, { numDice, numFaces, invalidDice: true })
        }
        if (!numFaces || parseInt(numFaces.toString()) > 255) {
            return fail(400, { numDice, numFaces, invalidFaces: true })
        }

        const assembledTx = await sorodiceContract.roll({
            num_dice: parseInt(numDice.toString()),
            num_faces: parseInt(numFaces.toString()),
        })

        return {
            success: true,
            assembled: assembledTx.toJSON(),
        }
    },
}
