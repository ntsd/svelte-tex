<script lang="ts">
	import temml, { type Options } from 'temml';

	interface Props {
		tex: string;
		temmlOptions?: Options;
	}

	const { tex, temmlOptions }: Props = $props();

	/**
	 * Render TeX to MathML. On failure (e.g. a ParseError when `throwOnError`
	 * is enabled, or any other unexpected error) render a clearly-marked error
	 * fallback instead of throwing, so invalid TeX cannot crash the consumer's
	 * app.
	 */
	const rendered = $derived.by(() => {
		try {
			return temml.renderToString(tex, temmlOptions);
		} catch (error) {
			const name = error instanceof Error && error.name ? error.name : 'Error';
			const message = error instanceof Error ? error.message : String(error);
			const escaped = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			const input = tex.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			return `<span class="temml-error" style="color:#b22222;white-space:pre-line;">${input}\n${name}: ${escaped}</span>`;
		}
	});
</script>

{@html rendered}
