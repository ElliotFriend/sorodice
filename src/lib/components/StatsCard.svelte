<script>
    import * as d3 from 'd3'

    /** @type {number} */
    export let num_faces
    /** @type {number} */
    export let total_rolls
    /** @type {number} */
    export let total_value
    /** @type {Array<Array<number>>} */
    export let rolled_freq

    let width = 440
    let height = 200
    const padding = { top: 20, right: 5, bottom: 20, left: 15 }

    const xTicks = [...Array.from({length: num_faces}, (_, i) => i + 1)]
    const mostFreqFace = Math.max(...rolled_freq.map(o => o[1]))
    const yTicks = [...Array.from({length: mostFreqFace + 1}).keys()]

    $: xScale = d3.scaleLinear()
        .domain([0, num_faces])
        .range([padding.left, width - padding.right])
    $: yScale = d3.scaleLinear()
        .domain([0, Math.max.apply(null, yTicks)])
        .range([height - padding.bottom, padding.top])

    $: innerWidth = width - (padding.left + padding.right)
    $: barWidth = innerWidth / xTicks.length
</script>

<div class="card variant-filled-surface overflow-hidden">
    <header class="p-2">
        <div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
            <svg>
                <g class="axis y-axis">
                    {#each yTicks as tick}
                        <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
                            <line x2="100%" />
                            <text y="-4">{tick}</text>
                        </g>
                    {/each}
                </g>

                <g class="axis x-axis">
                    {#each xTicks as tick, i}
                        <g class="tick" transform="translate({xScale(i) ?? 0},{height})">
                            <text x={barWidth / 2} y="-4">{tick}</text>
                        </g>
                    {/each}
                </g>

                <g class="bars">
                    {#each rolled_freq as freq}
                        <rect
                            x={xScale(freq[0]) - barWidth + 2}
                            y={yScale(freq[1])}
                            width={barWidth - 4}
                            height={yScale(0) - yScale(freq[1])}
                        />
                    {/each}
                </g>
            </svg>
        </div>
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
        <!-- <article class="space-y-4">
            <p>
                The {num_faces}-sided die has been rolled a total of <strong>{total_rolls} {total_rolls > 1 ? "times" : "time"}</strong>. The combined results of those rolls is a <strong>value of {total_value}</strong>.
            </p>
            <p>
                The distribution of which value has been rolled, and how many times can be seen in the chart above.
            </p>
        </article> -->
    </div>
    <hr class="opacity-50" />
</div>

<style>
    .chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
	}

	.tick {
		/* font-family: Helvetica, Arial; */
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: rgb(var(--on-surface));
		stroke-dasharray: 8;
	}

	.tick text {
		fill: rgb(var(--on-surface));
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: rgba(var(--color-primary-500) / 1);
		stroke: none;
		opacity: 0.7;
	}
</style>
