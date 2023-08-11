<script lang="ts">
	import temml, { type Options } from 'temml-ts';

	export let tex: string;
	export let temmlOptions: Options = {};
</script>

{@html temml.renderToString(tex, temmlOptions)}
