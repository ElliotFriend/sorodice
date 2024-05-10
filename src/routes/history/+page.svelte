<script>
    import { Accordion } from '@skeletonlabs/skeleton'
    import HistoryCard from '$lib/components/HistoryCard.svelte'

    /** @type {import('./$types').PageData} */
    export let data
</script>

<section class="space-y-6">
    <h1 class="h1">Back to the Future</h1>

    {#if data.events.length}
        <Accordion autocollapse class="card p-4">
            {#each data.events as event}
                <HistoryCard {event} />
            {/each}
        </Accordion>
    {/if}
</section>
