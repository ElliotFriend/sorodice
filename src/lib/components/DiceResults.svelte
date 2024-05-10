<script>
    import DieResult from './DieResult.svelte';
    /** @type {Array<number>} */
    export let result

    export let resetRollResults = () => {}
</script>

<section class="mt-4 space-y-6">
    <h2 class="h2 text-center" data-ignore-toc>Total: {result.reduce((acc, i) => acc + i)}</h2>
    <div class="w-full flex flex-wrap gap-1 justify-center">
        {#each result as roll}
            <DieResult {roll} />
        {/each}
    </div>

    <button type="button" class="btn variant-filled" on:click={resetRollResults}>Roll Again!</button>
</section>
