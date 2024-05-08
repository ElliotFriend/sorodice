<script>
    import { setContext } from 'svelte'
    import { writable } from 'svelte/store'

    // /** @type {import('./$types').LayoutData} */
    // export let data;
    // const user = writable()
    // $: user.set(data.user ?? null)
    // setContext('user', user)

    import '../app.postcss'
    import SiteHeader from '$lib/components/ui/SiteHeader.svelte'
    import PageContent from '$lib/components/PageContent.svelte'
</script>

<div class="w-full h-full flex flex-col overflow-hidden">
    <SiteHeader />

    <PageContent>
        <slot />
    </PageContent>
</div>
