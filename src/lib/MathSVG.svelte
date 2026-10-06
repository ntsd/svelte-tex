<script lang="ts">
	import { mathjax } from 'mathjax-full/js/mathjax';
	import { TeX } from 'mathjax-full/js/input/tex';
	import { SVG } from 'mathjax-full/js/output/svg';
	import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor';
	import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html';
	import type { OptionList } from 'mathjax-full/js/util/Options';

	interface Props {
		// TeX Input
		tex: string;
		// TeX Input Processor Options https://docs.mathjax.org/en/latest/options/input/tex.html#tex-input-processor-options
		texOptions?: OptionList;
		// SVG Output Processor Options, https://docs.mathjax.org/en/latest/options/output/svg.html#svg-options
		svgOptions?: OptionList;
		convertOptions?: OptionList;
	}

	const { tex, texOptions, svgOptions, convertOptions }: Props = $props();

	const adaptor = liteAdaptor();
	RegisterHTMLHandler(adaptor);

	// The MathJax document bakes in its Input/Output Jax at construction time,
	// so it must be rebuilt whenever texOptions/svgOptions change.
	// String() guards against JSON.stringify(undefined) === undefined, which
	// would otherwise make the key NaN and never compare equal.
	const optionsKey = (t: OptionList | undefined, s: OptionList | undefined): string =>
		String(JSON.stringify(t)) + String(JSON.stringify(s));

	let mathjaxSVGDocument = mathjax.document('', {
		InputJax: new TeX(texOptions),
		OutputJax: new SVG(svgOptions)
	});
	let lastOptionsKey = optionsKey(texOptions, svgOptions);
	// Bumped by the $effect below; read by getMathjaxSVG so the template re-renders
	// (and picks up the rebuilt document) when the options change.
	let optionsGeneration = $state(0);
	$effect(() => {
		const key = optionsKey(texOptions, svgOptions);
		if (key === lastOptionsKey) return;
		lastOptionsKey = key;
		mathjaxSVGDocument = mathjax.document('', {
			InputJax: new TeX(texOptions),
			OutputJax: new SVG(svgOptions)
		});
		optionsGeneration++;
	});

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
		// read to register the reactive dependency for the template
		optionsGeneration;
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
