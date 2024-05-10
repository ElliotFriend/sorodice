<script>
    import TriangleAlert from 'lucide-svelte/icons/triangle-alert'
    import Button from '$lib/components/ui/Button.svelte'



    /** @type {Object<string, import('$lib/typedefs').AlertOptions>} */
    const alertVariants = {
        success: {
            class: 'alert variant-filled-success',
            icon: TriangleAlert,
        },
        error: {
            class: 'alert variant-filled-error',
            icon: TriangleAlert,
        },
        warning: {
            class: 'alert variant-filled-warning',
            icon: TriangleAlert,
        },
    }

    /** @type {boolean} */
    export let visible = false
    /** @type {boolean} */
    export let showActions = false
    /** @type {string} */
    export let title = 'Warning'
    /** @type {string} */
    export let message = 'An error has occurred.'
    /** @type {("success"|"error"|"warning")} */
    export let variant = 'error'
</script>

{#if visible}
    <aside class={alertVariants[variant].class}>
        <div><svelte:component this={alertVariants[variant].icon} /></div>
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
