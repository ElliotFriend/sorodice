<script>
    import { getToastStore } from '@skeletonlabs/skeleton'
    import { enhance, deserialize } from '$app/forms'
    import Alert from '$lib/components/ui/Alert.svelte'
    import { userPublicKey } from '$lib/stores'
    import sorodiceContract from '$lib/contracts/sorodice_contract'
    import DiceResults from '$lib/components/DiceResults.svelte'

    import pkg from '@stellar/freighter-api'
    import { error } from '@sveltejs/kit'
    const { signTransaction } = pkg

    let toastStore = getToastStore()

    /** @type {import('./$types').ActionData} */
    export let form

    let numDice = form?.numDice ?? null
    let numFaces = form?.numFaces ?? null
    let isLoading = false
    $: diceTitle = numDice && numFaces ? `Rolling ${numDice}d${numFaces}` : "Configure Dice"

    /** @type {Array<number>} */
    let rollResult = []
    const resetRollResults = () => {
        numDice = numFaces = null
        rollResult = []
    }

    $: if (form?.txAssembly) {
        let txAssembly = sorodiceContract.txFromJSON(form.txAssembly)
        console.log('txAssembly', txAssembly)

        signTransaction(txAssembly.built?.toXDR(), {
            networkPassphrase: sorodiceContract.options.networkPassphrase,
        })
        .then((signedTx) => {
            console.log('signedTx', signedTx)
            const data = new FormData()
            data.append('signedTx', encodeURIComponent(signedTx))
            return fetch('?/submit', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'x-sveltekit-action': 'true',
                }
            })
        })
        .then(async (txStatus) => {
            let result = deserialize(await txStatus.text())
            if (!txStatus.ok) {
                error(txStatus.status, result.error.message)
            }
            console.log('received result', result)
            rollResult = result.data.rollResult
        })
        .catch((error) => {
            console.error('error submitting transaction:', error)
            toastStore.trigger({
                message: `Error submitting transaction: ${error.body?.message ?? error}`,
                background: 'variant-filled-error',
            })
        })
    }
</script>

<h1 class="h1">Let's Roll</h1>

{#if !rollResult.length}
    <section class="mt-4 space-y-6">
        <h2 class="h2">Choose Your Di(c)e:</h2>
        <p class="mt-4">
            Get started by selecting how many dice, with how many faces, you'd like to roll.
        </p>

        {#if form?.error}<Alert
                visible={true}
                title="Invalid Entry"
                message={form.error}
            />{/if}

        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="card variant-filled-surface overflow-hidden">
                <header class="p-2 mt-6">
                    <h2 class="h2 text-center" data-toc-ignore>{diceTitle}</h2>
                </header>
                <div class="p-4 space-y-4">
                    <form method="POST" action="?/simulate" use:enhance class="mt-4 space-y-4">

                        {#if $userPublicKey}<input
                                type="hidden"
                                value={$userPublicKey}
                                id="userPublicKey"
                                name="userPublicKey"
                            />{/if}

                        <label class="label text-center">
                            <input
                                placeholder="1"
                                bind:value={numDice}
                                id="numDice"
                                name="numDice"
                                class="input text-5xl text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                            />
                            <span>Number of Dice</span>
                        </label>

                        <label class="label text-center">
                            <input
                                placeholder="20"
                                bind:value={numFaces}
                                id="numFaces"
                                name="numFaces"
                                class="input text-5xl text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number"
                            />
                            <span>Number of Faces</span>
                        </label>

                        <button type="submit" class="btn variant-filled-primary" disabled={isLoading}>Roll!</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
{:else}
    <DiceResults {resetRollResults} result={rollResult} />
{/if}
