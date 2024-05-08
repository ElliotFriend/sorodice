<script>
    import { writable } from 'svelte/store'
    import { userPublicKey } from '$lib/stores'

    import Button from './Button.svelte'
    import Wallet from 'lucide-svelte/icons/wallet'
    import { Avatar } from '@skeletonlabs/skeleton'

    import pkg from '@stellar/freighter-api'
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

    $: loading = false
    $: dappIsAllowed = false
</script>

{#if dappIsAllowed && $userPublicKey}
    <Avatar src={`https://id.lobstr.co/${$userPublicKey}.png`} width="w-10" rounded="rounded-xl" />
{:else}
    <Button icon={Wallet} buttonText="Connect Freighter" onClick={connectWallet} {loading} />
{/if}
