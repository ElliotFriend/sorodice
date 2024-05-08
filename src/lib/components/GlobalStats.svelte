<script>
    import { page } from '$app/stores'
</script>

<div class="logo-cloud grid-cols-1 lg:!grid-cols-3 gap-1 [&>.logo-item]:variant-filled-surface">
    <div class="logo-item flex-col">
        <div>Total Rolls</div>
        <div class="h2 !ml-0">{$page.data.globalStats.total_dice_rolled}</div>
    </div>
    <div class="logo-item flex-col">
        <div>Total Value</div>
        <div class="h2 !ml-0">{$page.data.globalStats.total_value_rolled}</div>
    </div>
    <div class="logo-item flex-col">
        <div>Dice Rolled</div>
        <div class="!ml-0 flex flex-wrap gap-4 gap-y-1 justify-center">
        {#each $page.data.globalStats.which_dice_rolled as die}
            <div class="h2">{die}</div>
        {/each}
        </div>
    </div>
</div>
