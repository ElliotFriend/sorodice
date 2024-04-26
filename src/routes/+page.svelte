<script>
    import ArrowRight from 'lucide-svelte/icons/arrow-right'
</script>

<div class="p-6 space-y-4">
    <h1 class="h1 !text-8xl md:!text-6xl max-w-[600px]">
        <span
            class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
            >Roll.</span
        >
    </h1>
    <h1 class="h1 !text-8xl md:!text-6xl max-w-[600px]">
        <span
            class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
            >Them.</span
        >
    </h1>
    <h1 class="h1 !text-8xl md:!text-6xl max-w-[600px]">
        <span
            class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
            >Bones.</span
        >
    </h1>
    <p class="!text-xl max-w-[475px]">
        Here you can simulate rolling all kinds of dice! Trust me, it's cooler than it sounds...
    </p>
    <div class="flex gap-4">
        <a href="/roll" class="btn variant-filled-primary">
            <span>Start Rolling</span>
            <span><ArrowRight /></span>
        </a>
        <a href="/stats" class="btn variant-soft-primary"> View Stats </a>
    </div>
</div>
