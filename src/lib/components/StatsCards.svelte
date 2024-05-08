<script>
    import { page } from '$app/stores'
    import StatsCard from './StatsCard.svelte'
</script>

<div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each $page.data.allStats as dieStats}
        <StatsCard {...dieStats} />
    {/each}
</div>
