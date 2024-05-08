<script>
    import GlobalStats from '$lib/components/GlobalStats.svelte'
    import StatsCards from '$lib/components/StatsCards.svelte';
</script>

<section class="space-y-6">
    <h1 class="h1">Stats for Nerds!</h1>

    <div>
        <GlobalStats />
    </div>

    <p>
        We are tracking the number of rolls on each <code>n</code>-sided die for a couple reasons:
    </p>

    <ul class="list space-y-3">
        <li>
            <span>1.</span>
            <span class="flex-auto">I'm interested to see how "pseudo" Soroban's <code>prng</code> functionality is. My hypothesis is: each face on a given die is just as likely to be rolled as any other face. If that holds true, we should see each die's result histogram trend toward a "<a class="anchor" target="_blank" href="https://en.wikipedia.org/wiki/Discrete_uniform_distribution">uniform distribution</a>." Keeping these stats will help to (in)validate this hypothesis.</span>
        </li>
        <li>
            <span>2.</span>
            <span class="flex-auto">It's interesting to see which die or dice turn out to be most frequently used.</span>
        </li>
        <li>
            <span>3.</span>
            <span class="flex-auto">I'm a <a class="anchor" target="_blank" href="https://www.reddit.com/r/DataHoarder/">data hoarder</a> at heart. If my project is producing some kind of data, I can't help myself but keep it and track it.</span>
        </li>
    </ul>

    <div>
        <StatsCards />
    </div>
</section>

<style>
    .list li {
        align-items: start;
    }
</style>
