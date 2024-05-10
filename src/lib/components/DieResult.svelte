<script>
    import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dices } from "lucide-svelte";

    /** @type {Object<number, import('svelte').ComponentType<import('lucide-svelte').Icon>>} */
    const diceIcons = {
        1: Dice1,
        2: Dice2,
        3: Dice3,
        4: Dice4,
        5: Dice5,
        6: Dice6,
    }

    /** @type {number} */
    export let roll

    $: iconToUse = roll in diceIcons ? diceIcons[roll] : Dices
</script>

<div class="flex-none w-24">
    <div class="card p-4 flex flex-col justify-center items-center">
        <span><svelte:component this={iconToUse} size={72} /></span>
        <span class="text-3xl">{roll}</span>
    </div>
</div>
