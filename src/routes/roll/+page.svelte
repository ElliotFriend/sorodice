<script>
    import { enhance, deserialize } from '$app/forms'
    import Alert from '$lib/components/ui/Alert.svelte'
    import { userPublicKey } from '$lib/stores'
    import sorodiceContract from '../../contracts/sorodice_contract'

    import pkg from '@stellar/freighter-api'
    const { signTransaction } = pkg

    /** @type {import('./$types').ActionData} */
    export let form

    let numDice = form?.numDice ?? 1
    let numFaces = form?.numFaces ?? 20
    /** @type {import('sorodice_contract').RollResult|null} */
    $: rollResult = null

    $: if (form?.assembled) {
        let tx = sorodiceContract.txFromJSON(form.assembled)
        tx.signAndSend({signTransaction})
            .then(({ result }) => rollResult = result.value)
            .catch((error) => {
                console.error('error submitting transaction:', error)
            })
    }
</script>

<h1 class="h1">Let's Roll</h1>

<section class="mt-4">
    <h2 class="h2">Choose Your Di(c)e:</h2>
    <p class="mt-4">Get started by selecting how many dice, with how many faces, you'd like to roll.</p>

    <form method="POST" action="?/simulate" use:enhance class="mt-4 space-y-4">
        {#if form?.invalidDice}<Alert
                visible={true}
                title="Invalid Dice"
                message="Please enter a valid number of dice."
            />{/if}
        {#if form?.invalidFaces}<Alert
                visible={true}
                title="Invalid Faces"
                message="Please enter a valid number of faces."
            />{/if}
        {#if $userPublicKey}<input
            type="hidden"
            value={$userPublicKey}
            id="userPublicKey"
            name="userPublicKey"
        />{/if}

        <label class="label">
            <span>Number of Dice</span>
            <input
                placeholder="1"
                bind:value={numDice}
                id="numDice"
                name="numDice"
                class="input variant-form-material"
                type="number"
                max="255"
                min="1"
            />
        </label>

        <label class="label">
            <span>Number of Faces</span>
            <input
                placeholder="20"
                bind:value={numFaces}
                id="numFaces"
                name="numFaces"
                class="input variant-form-material"
                type="number"
                max="255"
                min="1"
            />
        </label>

        <button type="submit" class="btn variant-filled-primary">Roll!</button>
    </form>
</section>

{#if rollResult}
    <section class="mt-4">
        <p><strong>Total:</strong> {rollResult.total}</p>
        <ol>
            {#each rollResult.rolls as roll}
                <li>{roll}</li>
            {/each}
        </ol>
    </section>
{/if}
