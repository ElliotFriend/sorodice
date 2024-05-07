<script>
    import GlobalStats from '$lib/components/GlobalStats.svelte'
    import StatsCards from '$lib/components/StatsCards.svelte';
    import DummyCard from '$lib/components/DummyCard.svelte';

    /** @type {import('./$types').PageData} */
    export let data
    console.log('stats/+page.svelte data', data)
</script>

<h1 class="h1">Stats for Nerds!</h1>

<div class="mt-4">
    <GlobalStats />
</div>

<!-- <div class="mt-4">
    <DummyCard />
</div> -->

<div class="mt-4">
    <StatsCards />
</div>
