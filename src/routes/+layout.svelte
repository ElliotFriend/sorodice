<script>
	import '../app.postcss';
	import SiteHeader from '$lib/components/ui/SiteHeader.svelte'
    import PageContent from '$lib/components/PageContent.svelte'
</script>

<div class="w-full h-full flex flex-col overflow-hidden">
    <SiteHeader />

    <PageContent>
        <slot />
    </PageContent>
</div>
