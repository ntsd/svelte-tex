<svelte:options runes={false} />

<script lang="ts">
	import temml, { type Options } from 'temml';

	export let tex: string;
	export let temmlOptions: Options | undefined = undefined;
</script>

{@html temml.renderToString(tex, temmlOptions)}