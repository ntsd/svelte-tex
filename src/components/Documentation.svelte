<script lang="ts">
	import CodeBlock from './CodeBlock.svelte';
	import { npmLink } from '../const.ts';
	import TryItOnline from './TryItOnline.svelte';

	let copied = $state(false);
	let copiedTimeout: number;

	const installCode = 'npm install svelte-tex';
	const exmapleCode = `<!-- Svelte 5 (Runes) -->
\<script lang="ts">
  import MathML from 'svelte-tex/package/MathML.svelte';

  const tex = String.raw\`\\frac{(n^2+n)(2n+1)}{6}\`;
\<\/script>

<MathML {tex} />
<!-- or include Temml options -->
<MathML {tex} temmlOptions={{}} />`;

	const exmapleCodeV4 = `<!-- Svelte 4 (Export Let) -->
\<script lang="ts">
  import MathML from 'svelte-tex/package/v4/MathML.svelte';

  const tex = String.raw\`\\frac{(n^2+n)(2n+1)}{6}\`;
\<\/script>

<MathML {tex} />
<!-- or include Temml options -->
<MathML {tex} temmlOptions={{}} />`;

	const exmapleCode2 = `<!-- Svelte 5 (Runes) -->
\<script lang="ts">
  import MathSVG from 'svelte-tex/package/MathSVG.svelte';

  const tex = String.raw\`\\frac{(n^2+n)(2n+1)}{6}\`;
\<\/script>

<MathSVG {tex} />
<!-- or include MathJax options -->
<!-- texOptions: https://docs.mathjax.org/en/latest/options/input/tex.html -->
<!-- svgOptions: https://docs.mathjax.org/en/latest/options/output/svg.html -->
<MathSVG {tex} texOptions={{}} svgOptions={{ fontCache: 'local' }} />`;

	const exmapleCode2V4 = `<!-- Svelte 4 (Export Let) -->
\<script lang="ts">
  import MathSVG from 'svelte-tex/package/v4/MathSVG.svelte';

  const tex = String.raw\`\\frac{(n^2+n)(2n+1)}{6}\`;
\<\/script>

<MathSVG {tex} />
<!-- or include MathJax options -->
<!-- texOptions: https://docs.mathjax.org/en/latest/options/input/tex.html -->
<!-- svgOptions: https://docs.mathjax.org/en/latest/options/output/svg.html -->
<MathSVG {tex} texOptions={{}} svgOptions={{ fontCache: 'local' }} />`;
</script>

<h1 class="text-4xl font-bold">Svelte TeX</h1>

<a href={npmLink} class="mt-4"
	><img src="https://badge.fury.io/js/svelte-tex.svg" alt="npm version" height="18" /></a
>

<p class="mt-4">
	Svelte Component to convert <a class="underline" href="https://en.wikipedia.org/wiki/TeX">TeX</a>
	to rendered SVG using
	<a class="underline" href="https://github.com/mathjax/MathJax">MathJax</a>
	or rendered MathML using <a class="underline" href="https://github.com/ronkok/Temml">Temml</a>.
</p>

<TryItOnline />

<h2 class="mb-4 mt-8 text-2xl font-bold">Features</h2>

<ul class="list-disc pl-6">
	<li>✨ Compatible with both Svelte 4 and Svelte 5</li>
	<li>Convert TeX to SVG using MathJax</li>
	<li>Convert TeX to MathML using Temml</li>
	<li>Support MathJax options</li>
	<li>Support Temml options</li>
</ul>

<h2 class="mb-4 mt-8 text-2xl font-bold">Installation</h2>

<button
	class="cursor-pointer select-all rounded px-4 py-2 ring-2"
	onclick={(e) => {
		navigator.clipboard.writeText(e.currentTarget.innerText);
		copied = true;
		if (copiedTimeout !== undefined) clearTimeout(copiedTimeout);
		copiedTimeout = setTimeout(() => (copied = false), 2000);
	}}
>
	<code>
		{installCode}
	</code>
</button>

<p class="opacity-0 transition" class:opacity-100={copied}>copied to clipboard</p>

<h2 class="mb-4 text-2xl font-bold">Usage</h2>

<p class="mb-4">MathML is more recommended since MathSVG bundle size is not small.</p>

<div class="mb-4 rounded bg-blue-50 p-4">
	<h4 class="mb-2 text-lg font-semibold">📖 Compatibility</h4>
	<ul class="text-sm">
		<li><strong>Svelte 5:</strong> Use components from <code>svelte-tex/package</code> (Runes)</li>
		<li><strong>Svelte 4:</strong> Use components from <code>svelte-tex/package/v4</code> (Export Let)</li>
	</ul>
</div>

<h3 class="mb-2 mt-6 text-2xl font-bold">MathML</h3>

<h4 class="mb-2 text-lg font-medium">Svelte 5</h4>
<CodeBlock class="select-all ring-2" code={exmapleCode} />

<h4 class="mb-2 mt-4 text-lg font-medium">Svelte 4</h4>
<CodeBlock class="select-all ring-2" code={exmapleCodeV4} />

<h3 class="mb-2 mt-6 text-2xl font-bold">MathSVG</h3>

<h4 class="mb-2 text-lg font-medium">Svelte 5</h4>
<CodeBlock class="select-all ring-2" code={exmapleCode2} />

<h4 class="mb-2 mt-4 text-lg font-medium">Svelte 4</h4>
<CodeBlock class="select-all ring-2" code={exmapleCode2V4} />
