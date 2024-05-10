<script>
    import LoaderCircle from 'lucide-svelte/icons/loader-circle'

    /** import('svelte').ComponentType<import('lucide-svelte').Icon> */
    export let icon

    export let buttonText = 'Button'
    export let loading = false
    export let loadingText = 'Loading...'
    export let onClick = () => {}
</script>

<button on:click={onClick} type="button" class="btn variant-filled" disabled={loading}>
    {#if loading}
        <span><svelte:component this={LoaderCircle} class="animate-spin" /></span>
        <span>{loadingText}</span>
    {:else if icon}
        <span><svelte:component this={icon} /></span>
        <span>{buttonText}</span>
    {:else}
        {buttonText}
    {/if}
</button>
