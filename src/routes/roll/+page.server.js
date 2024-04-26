import { fail } from '@sveltejs/kit'

/** @type {import('./$types').Actions} */
export const actions = {
    simulate: async ({ request }) => {
        const data = await request.formData()
        const numDice = data.get('numDice')
        const numFaces = data.get('numFaces')

        if (!numDice) {
            return fail(400, { numDice, numFaces, invalidDice: true })
        }
        if (!numFaces) {
            return fail(400, { numDice, numFaces, invalidFaces: true })
        }

        return { simulated: true }
    }
}
