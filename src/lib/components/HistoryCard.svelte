<script>
    import { AccordionItem } from '@skeletonlabs/skeleton'
    import Identicon from '$lib/components/ui/Identicon.svelte'
    import DieResult from '$lib/components/DieResult.svelte'

    /** @type {import('$lib/typedefs').ContractEvent} */
    export let event

    let address = event.topic[1]
    let diceConfig = `${event.topic[2]}d${event.topic[3]}`
    export const Types = {}
</script>

<AccordionItem>
    <svelte:fragment slot="lead"><Identicon {address} /></svelte:fragment>
    <svelte:fragment slot="summary">{diceConfig}</svelte:fragment>
    <svelte:fragment slot="content">
        <h4 class="h4 text-center">Total: {event.value.reduce((acc, i) => acc + i)}</h4>
        <div class="w-full flex flex-wrap gap-1 justify-center">
            {#each event.value as roll}
                <DieResult {roll} />
            {/each}
        </div>
    </svelte:fragment>
</AccordionItem>
