<script>
    import ConnectWallet from './ConnectFreighter.svelte'
    import NavbarButton from './NavbarButton.svelte'

    import Dices from 'lucide-svelte/icons/dices'
    import LineChart from 'lucide-svelte/icons/line-chart'
    import History from 'lucide-svelte/icons/history'
    import LockKeyhole from 'lucide-svelte/icons/lock-keyhole'

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
            name: 'History',
            href: '/history',
            icon: History,
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
                <a href="/" title="SoroDice Homepage">
                    <span><strong class="text-xl">SoroDice</strong></span>
                </a>
            </div>
            <div class="flex space-x-4 pl-8">
                {#each menuItems as item}
                    <NavbarButton {item} />
                {/each}
            </div>
            <div class="flex-none flex items-center space-x-4 place-content-end">
                <ConnectWallet />
            </div>
        </div>
    </div>
</header>
