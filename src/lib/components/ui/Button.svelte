<script>
    import LoaderCircle from "lucide-svelte/icons/loader-circle";
    import { writable } from "svelte/store"

    /** @type {any|undefined} */
    export let icon = undefined
    export let buttonText = "Button"
    export let loading = false
    export let loadingText = "Loading..."
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
