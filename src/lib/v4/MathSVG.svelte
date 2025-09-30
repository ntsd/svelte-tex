<svelte:options runes={false} />

<script lang="ts">
	import { mathjax } from 'mathjax-full/js/mathjax';
	import { TeX } from 'mathjax-full/js/input/tex';
	import { SVG } from 'mathjax-full/js/output/svg';
	import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor';
	import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html';
	import type { OptionList } from 'mathjax-full/js/util/Options';

	// TeX Input
	export let tex: string;
	// TeX Input Processor Options https://docs.mathjax.org/en/latest/options/input/tex.html#tex-input-processor-options
	export let texOptions: OptionList | undefined = undefined;
	// SVG Output Processor Options, https://docs.mathjax.org/en/latest/options/output/svg.html#svg-options
	export let svgOptions: OptionList | undefined = undefined;
	export let convertOptions: OptionList | undefined = undefined;

	const adaptor = liteAdaptor();
	RegisterHTMLHandler(adaptor);

	const mathjaxSVGDocument = mathjax.document('', {
		InputJax: new TeX(texOptions),
		OutputJax: new SVG(svgOptions)
	});

	function getMathjaxSVG(tex: string): string {
		const node = mathjaxSVGDocument.convert(tex, convertOptions);
		return adaptor.innerHTML(node);
	}
</script>

{@html getMathjaxSVG(tex)}