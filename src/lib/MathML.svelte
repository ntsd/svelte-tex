<script lang="ts">
	import temml, { type Options } from 'temml';

	interface Props {
		tex: string;
		temmlOptions?: Options;
	}

	const { tex, temmlOptions }: Props = $props();
</script>

{@html temml.renderToString(tex, temmlOptions)}
