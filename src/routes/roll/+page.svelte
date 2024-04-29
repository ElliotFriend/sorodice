<script>
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/ui/Alert.svelte'

    /** @type {import('./$types').ActionData} */
    export let form

    let numDice = form?.numDice ?? 1
    // console.log('numDice', numDice)
    let numFaces = form?.numFaces ?? 20
</script>

<h1 class="h1">Let's Roll</h1>

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
