import { fail } from '@sveltejs/kit'

import { buildRollTx, simulateTx, prepareTx } from '$lib/stellar'

/** @type {import('./$types').Actions} */
export const actions = {
    simulate: async ({ request }) => {
        const data = await request.formData()
        const numDice = data.get('numDice')
        const numFaces = data.get('numFaces')

        if (!numDice || parseInt(numDice.toString()) > 255) {
            return fail(400, { numDice, numFaces, invalidDice: true })
        }
        if (!numFaces || parseInt(numFaces.toString()) > 255) {
            return fail(400, { numDice, numFaces, invalidFaces: true })
        }

        const tx = await buildRollTx({
            numDice: parseInt(numDice.toString()),
            numFaces: parseInt(numFaces.toString()),
            publicKey: 'GC5WHUWDS2T2CELDWUH2DQCHJYTTCCSR6GTTZMPP7DD72EZM4KGPIH5Q',
        })
        console.log('tx', tx)

        const simTx = await simulateTx(tx)
        console.log('simTx', simTx)

        const prepTx = await prepareTx(tx)
        console.log('prepTx', prepTx)

        return { simulated: true }
    },
}
