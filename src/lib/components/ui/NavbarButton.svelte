<script>
    /**
     * @typedef {Object} MenuItem An array of objects configuring the navbar menu items.
     * @property {string} name The text inside the button
     * @property {string} href The path the button should lead to
     * @property {import('svelte').ComponentType<import('lucide-svelte').Icon>} icon The icon to display alongside the button text
     */

    /** @type {MenuItem} */
    export let item
</script>

<a href={item.href} class="btn hover:variant-soft-primary">
    <span><svelte:component this={item.icon} /></span>
    <span>{item.name}</span>
</a>
