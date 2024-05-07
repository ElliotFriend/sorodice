<script>
    import * as d3 from 'd3'

    const num_faces = 6
    const rolled_freq = [
        { face: 1, frequency: 1},
        { face: 2, frequency: 2},
        { face: 3, frequency: 3},
        { face: 4, frequency: 4},
        { face: 5, frequency: 2},
        { face: 6, frequency: 1},
    ]

    let width = 500
    let height = 200
    const padding = { top: 20, right: 15, bottom: 20, left: 25 }

    const xTicks = [...Array.from({length: num_faces}, (_, i) => i + 1)]
    console.log('xTicks', xTicks)
    console.log('rolled_freq', rolled_freq)
    const mostFreqFace = Math.max(...rolled_freq.map(o => o.frequency))
    // console.log('mostFreqFace', mostFreqFace)
    console.log('rolled_freq', rolled_freq)
    // const yTicks = [...Array.from({length: mostFreqFace + 1}).keys()]
    const yTicks = [1, 2, 3, 4, 5]
    console.log('yTicks', yTicks)

    $: xScale = d3.scaleLinear()
        .domain([0, num_faces])
        .range([padding.left, width - padding.right])
    console.log('xScale', xScale)
    $: yScale = d3.scaleLinear()
        .domain([0, Math.max.apply(null, yTicks)])
        .range([height - padding.bottom, padding.top])

    $: innerWidth = width - (padding.left + padding.right)
    $: barWidth = innerWidth / xTicks.length
</script>

<h2 class="h2">Dummy Card!</h2>
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
        {#each rolled_freq as freq, i}
            <g class="tick" transform="translate({xScale(i)},{height})">
                <text x={barWidth / 2} y="-4">{freq.face}</text>
            </g>
        {/each}
    </g>

    <g class="bars">
        {#each rolled_freq as freq, i}
            <rect
                x={xScale(i) + 2}
                y={yScale(freq.frequency)}
                width={barWidth - 4}
                height={yScale(0) - yScale(freq.frequency)}
            />
        {/each}
    </g>
</svg>

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
		font-family: Helvetica, Arial;
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: #a11;
		stroke: none;
		opacity: 0.65;
	}
</style>
