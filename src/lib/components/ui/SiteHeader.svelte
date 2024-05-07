<script>
    import ConnectWallet from './ConnectFreighter.svelte';

    import Dices from 'lucide-svelte/icons/dices'
    import LineChart from 'lucide-svelte/icons/line-chart'
    import LockKeyhole from 'lucide-svelte/icons/lock-keyhole'

    /**
     * @typedef {Object} MenuItem
     * @property {string} name
     * @property {string} href
     * @property {import('svelte').ComponentType<import('lucide-svelte').Icon>} icon
     */

    /** @type {MenuItem[]} */
    const menuItems = [
        {
            name: 'Roll',
            href: '/roll',
            icon: Dices,
        },
        {
            name: 'Stats',
            href: '/stats',
            icon: LineChart,
        },
        {
            name: 'Admin',
            href: '/admin',
            icon: LockKeyhole,
        },
    ]
</script>

<header class="flex-none z-10">
    <div class="flex flex-col bg-surface-100-800-token space-y-4 p-4">
        <div class="grid items-center grid-cols-[auto_1fr_auto] gap-4">
            <!-- website title -->
            <div class="flex-none flex items-center space-x-4">
                <a href="/" title="Homepage">
                    <span><strong class="text-xl">SoroDice</strong></span>
                </a>
            </div>
            <div class="flex place-content-center space-x-4">
                {#each menuItems as item}
                    <a href={item.href} class="btn hover:variant-soft-primary">
                        <span><svelte:component this={item.icon} /></span>
                        <span>{item.name}</span>
                    </a>
                {/each}
            </div>
            <div class="flex-none flex items-center space-x-4 place-content-end">
                <ConnectWallet />
            </div>
        </div>
    </div>
</header>
