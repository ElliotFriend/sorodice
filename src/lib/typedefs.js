/**
 * @typedef {Object} AlertOptions
 * @property {string} class
 * @property {import('svelte').ComponentType<import('lucide-svelte').Icon>} icon
 */

/**
 * @typedef {Object} ContractEvent An object reflecting the event emitted from an invocation of the `roll` function.
 * @property {Array<string | number>} topic The topics the event was emitted with: `["roll", roller: Address, num_dice: number, num_faces: number]`
 * @property {Array<number>} value The data the event was emitted with
 */

/**
 * @typedef {Object} MenuItem An array of objects configuring the navbar menu items.
 * @property {string} name The text inside the button
 * @property {string} href The path the button should lead to
 * @property {import('svelte').ComponentType<import('lucide-svelte').Icon>} icon The icon to display alongside the button text
 */

export {}
