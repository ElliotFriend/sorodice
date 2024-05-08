<script>
    import StatsHistogram from '$lib/components/StatsHistogram.svelte'

    /** @type {number} */
    export let num_faces
    /** @type {Array<Array<number>>} */
    export let rolled_freq

    let total_rolls = rolled_freq.reduce((acc, item) => acc + item[1], 0)
    let total_value = rolled_freq.reduce((acc, item) => acc + (item[0] * item[1]), 0)
</script>

<div class="card variant-filled-surface overflow-hidden">
    <header class="p-2">
        <StatsHistogram num_faces={num_faces} rolled_freq={rolled_freq} />
    </header>
    <div class="p-4 space-y-4">
        <h3 class="h3" data-toc-ignore>{num_faces}-sided Die Stats</h3>
        <div class="table-container">
            <table class="table table-hover">
                <tbody>
                    <tr>
                        <td>Number of Faces</td>
                        <td>{num_faces}</td>
                    </tr>
                    <tr>
                        <td>Total Rolls</td>
                        <td>{total_rolls}</td>
                    </tr>
                    <tr>
                        <td>Total Value</td>
                        <td>{total_value}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
