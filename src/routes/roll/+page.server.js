import { fail } from '@sveltejs/kit'

import sorodiceContract from '$lib/contracts/sorodice_contract'
import { yeetTx } from '$lib/server/stellar'
import { scValToNative } from '@stellar/stellar-sdk'

/** @type {import('./$types').Actions} */
export const actions = {
    simulate: async ({ request }) => {
        const data = await request.formData()
        const numDice = data.get('numDice')
        const numFaces = data.get('numFaces')
        const userPublicKey = data.get('userPublicKey')
        if (!userPublicKey) {
            return fail(400, {
                numDice,
                numFaces,
                error: 'Please connect with freighter.',
            })
        }
        sorodiceContract.options.publicKey = userPublicKey.toString()

        if (!numDice || parseInt(numDice.toString()) > 255) {
            return fail(400, {
                numDice,
                numFaces,
                error: 'Please enter a valid number of dice.',
            })
        }
        if (!numFaces || parseInt(numFaces.toString()) > 255) {
            return fail(400, {
                numDice,
                numFaces,
                error: 'Please enter a valid number of faces.',
            })
        }

        const assembledTx = await sorodiceContract.roll(
            {
                roller: userPublicKey.toString(),
                num_dice: parseInt(numDice.toString()),
                num_faces: parseInt(numFaces.toString()),
            },
            {
                timeoutInSeconds: 60,
            },
        )

        return {
            txAssembly: assembledTx.toJSON(),
        }
    },

    submit: async ({ request }) => {
        const data = await request.formData()
        const signedTx = data.get('signedTx')

        if (!signedTx) {
            return fail(400, {
                error: 'Signed transaction missing.',
            })
        }

        let status = await yeetTx(decodeURIComponent(signedTx.toString()))
        if (status.status !== 'SUCCESS') {
            return fail(500, {
                error: `Transaction submission failed: ${status.status}`,
            })
        }
        // console.log('yeeted status', status)
        return {
            txStatus: status.status,
            rollResult: scValToNative(status.returnValue),
        }
    },
}
