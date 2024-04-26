<script>
    import TriangleAlert from "lucide-svelte/icons/triangle-alert"
    import Button from '$lib/components/ui/Button.svelte'

    /** @type boolean */
    export let visible = false
    /** @type boolean */
    export let showActions = false
    /** @type string */
    export let title = 'Warning'
    /** @type string */
    export let message = 'An error has occurred.'
    /** @type string */
    export let variant = 'filled-error'
</script>

{#if visible}
    <aside class={`alert variant-${variant}`}>
        <div><TriangleAlert /></div>
        <div class="alert-message">
            <h3 class="h3">{title}</h3>
            <p>{message}</p>
        </div>
        {#if showActions}
            <div class="alert-actions">
                <Button />
            </div>
        {/if}
    </aside>
{/if}
