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

	// The MathJax document bakes in its Input/Output Jax at construction time,
	// so it must be rebuilt whenever texOptions/svgOptions change.
	// String() guards against JSON.stringify(undefined) === undefined, which
	// would otherwise make the key NaN and never compare equal.
	const optionsKey = (
		texOptions: OptionList | undefined,
		svgOptions: OptionList | undefined
	): string => String(JSON.stringify(texOptions)) + String(JSON.stringify(svgOptions));

	let mathjaxSVGDocument = mathjax.document('', {
		InputJax: new TeX(texOptions),
		OutputJax: new SVG(svgOptions)
	});
	let lastOptionsKey = optionsKey(texOptions, svgOptions);

	$: if (optionsKey(texOptions, svgOptions) !== lastOptionsKey) {
		lastOptionsKey = optionsKey(texOptions, svgOptions);
		mathjaxSVGDocument = mathjax.document('', {
			InputJax: new TeX(texOptions),
			OutputJax: new SVG(svgOptions)
		});
	}

	/**
	 * Escape a string for safe interpolation into HTML (`{@html}` output).
	 */
	function escapeHTML(value: string): string {
		return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	/**
	 * Convert TeX to an SVG string.
	 *
	 * mathjax-full does not throw on invalid TeX: `convert()` returns a
	 * marker node carrying a `data-mjx-error` attribute (e.g. "Missing
	 * argument for \frac"). We detect that marker — or any thrown error —
	 * and return a clearly-marked fallback instead of a misleading red
	 * error SVG, so invalid TeX cannot take down the consumer's tree.
	 */
	function getMathjaxSVG(tex: string): string {
		let svgHTML: string;
		try {
			const node = mathjaxSVGDocument.convert(tex, convertOptions);
			svgHTML = adaptor.innerHTML(node);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			return `<span class="mathsvg-error" style="color:#b22222;white-space:pre-line;">${escapeHTML(tex)}\n${escapeHTML(message)}</span>`;
		}
		const mjxError = svgHTML.match(/data-mjx-error="([^"]*)"/);
		if (mjxError && mjxError[1]) {
			return `<span class="mathsvg-error" style="color:#b22222;white-space:pre-line;">${escapeHTML(tex)}\n${escapeHTML(mjxError[1])}</span>`;
		}
		return svgHTML;
	}
</script>

{@html getMathjaxSVG(tex)}
