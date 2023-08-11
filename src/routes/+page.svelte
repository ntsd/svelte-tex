<script lang="ts">
	import MathSVG from '$lib/MathSVG.svelte';
	import MathML from '$lib/MathML.svelte';

	const tex = `\\left( \\sum_{k=1}^n a_k b_k \\right)^2 \\leq \\left( \\sum_{k=1}^n a_k^2 \\right) \\left( \\sum_{k=1}^n b_k^2 \\right)`;
</script>

<MathSVG {tex} svgOptions={{ fontCache: 'local' }} />

<br />

<MathML {tex} />
