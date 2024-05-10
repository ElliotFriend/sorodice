<script>
    import { initializeStores, Toast } from '@skeletonlabs/skeleton'

    import '../app.postcss'
    import SiteHeader from '$lib/components/ui/SiteHeader.svelte'
    import PageContent from '$lib/components/PageContent.svelte'
    import Footer from '$lib/components/ui/Footer.svelte'

    initializeStores()
</script>

<Toast />
<div class="w-full h-full flex flex-col overflow-hidden">
    <SiteHeader />

    <PageContent>
        <slot />
    </PageContent>

    <Footer />
</div>
