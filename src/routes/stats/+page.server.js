/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
    runtime: 'nodejs20.x'
}

import sorodiceContract from '$lib/contracts/sorodice_contract'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    let globalStats = (await sorodiceContract.get_global_stats()).result.unwrap()
    globalStats.which_dice_rolled.sort((a, b) => a - b)

    let allStats = (await sorodiceContract.get_all_stats()).result.unwrap()
    allStats.sort((a, b) => a.num_faces - b.num_faces)
    return {
        globalStats,
        allStats,
    }
}
