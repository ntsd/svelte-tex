<script lang="ts">
	interface Props {
		code: string;
		language?: string;
		class?: string;
	}

	let { code, language = 'typescript', class: className = '' }: Props = $props();
</script>

<pre class="overflow-x-auto rounded bg-gray-100 p-4 {className}"><code class="text-sm">{code}</code></pre>