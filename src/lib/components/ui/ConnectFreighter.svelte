<script>
    import { userPublicKey } from '$lib/stores'

    import Button from '$lib/components/ui/Button.svelte'
    import Wallet from 'lucide-svelte/icons/wallet'
    import Identicon from '$lib/components/ui/Identicon.svelte'

    import pkg from '@stellar/freighter-api'
    import { onMount } from 'svelte'
    const { isAllowed, setAllowed, getUserInfo } = pkg

    const connectWallet = async () => {
        loading = true
        dappIsAllowed = await isAllowed()
        if (!dappIsAllowed) {
            try {
                await setAllowed()
                dappIsAllowed = true
            } catch (error) {
                console.error('error in allowing wallet connection:', error)
            }
        }
        const { publicKey } = await getUserInfo()
        if (publicKey) userPublicKey.set(publicKey)
        loading = false
    }

    onMount(async () => {
        loading = true
        dappIsAllowed = await isAllowed()
        if (dappIsAllowed) {
            const { publicKey } = await getUserInfo()
            if (publicKey) userPublicKey.set(publicKey)
        }
        loading = false
    })

    let loading = false
    let dappIsAllowed = false
</script>

{#if $userPublicKey}
    <Identicon address={$userPublicKey} />
{:else}
    <Button icon={Wallet} buttonText="Connect Freighter" onClick={connectWallet} {loading} />
{/if}
