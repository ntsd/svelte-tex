<script lang="ts">
	import MathSVG from '$lib/MathSVG.svelte';
	import MathML from '$lib/MathML.svelte';

	let tex = String.raw`\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)`;
</script>

<h2 class="mb-4 mt-8 text-xl font-bold">Try It Online</h2>

<div class="mt-2">
	<h3 class="mb-2 font-bold">TeX</h3>
	<textarea
		class="scrollable min-w-full resize-none p-2 ring"
		bind:value={tex}
		placeholder="Add LaTeX/TeX here..."
		rows="3"
	></textarea>
</div>

<div class="mt-4">
	<div class="mb-2 flex justify-between">
		<h3 class="font-bold">Output SVG</h3>
	</div>
	<MathSVG {tex} svgOptions={{ fontCache: 'local' }} />
</div>

<div class="mt-4">
	<div class="mb-2 flex justify-between">
		<h3 class="font-bold">Output MathML</h3>
	</div>
	<MathML {tex} />
</div>

<style>
	.scrollable {
		max-height: 50vh;
		overflow-y: auto;
	}
</style>
