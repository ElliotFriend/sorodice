<script>
    import { enhance } from "$app/forms"

    export let data
    export let form

    let numDice = 1
</script>

<h1 class="h1">Let's Roll</h1>

<p class="mt-4">Get started by selecting how many dice, and how many faces you'd like to roll.</p>

<form class="mt-4 space-y-4" method="POST" use:enhance>
    <label class="label">
        <span>Number of Dice</span>
        <input id="numDice" class="input variant-form-material" type="number" max="255" min="1" />
    </label>

    <label class="label">
        <span>Number of Faces</span>
        <input id="numFaces" class="input variant-form-material" type="number" max="255" min="1" />
    </label>

    <button type="button" class="btn variant-filled-primary">Roll!</button>
</form>
