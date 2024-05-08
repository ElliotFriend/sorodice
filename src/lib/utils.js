/**
 * Sleep a specified number of milliseconds and then move on.
 * @param {number} ms number of milliseconds to wait
 * @returns {Promise<void>}
 */
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
