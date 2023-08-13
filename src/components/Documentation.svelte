<script lang="ts">
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import 'svelte-highlight/styles/github.css';
	import { npmLink } from '../const';
	import TryItOnline from './TryItOnline.svelte';

	let copied = false;
	let copiedTimeout: NodeJS.Timeout;

	const installCode = 'npm install svelte-tex';
	const exmapleCode = `\<script lang="ts">
  import MathML from 'svelte-tex/package/MathML.svelte';

  const tex = String.raw\`\\frac{(n^2+n)(2n+1)}{6}\`;
\<\/script>

<MathML {tex} />
// or include Temml options
<MathML {tex} temmlOptions={{}} />
`;

	const exmapleCode2 = `\<script lang="ts">
  import MathSVG from 'svelte-tex/package/MathSVG.svelte';

  const tex = String.raw\`\\frac{(n^2+n)(2n+1)}{6}\`;
\<\/script>

<MathSVG {tex} />
// or include MathJax options
// texOptions from https://docs.mathjax.org/en/latest/options/input/tex.html#tex-input-processor-options
// svgOptions from https://docs.mathjax.org/en/latest/options/output/svg.html#svg-options
<MathSVG {tex} texOptions={{}} svgOptions={{ fontCache: 'local' }} />
`;
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

<h2 class="text-2xl font-bold mt-8 mb-4">Features</h2>

<ul class="list-disc pl-6">
	<li>Convert TeX to SVG using MathJax</li>
	<li>Convert TeX to MathML using Temml</li>
	<li>Support MathJax options</li>
	<li>Support Temml options</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4">Installation</h2>

<code
	class="cursor-pointer select-all rounded px-4 py-2 ring-2"
	on:mousedown={(e) => {
		navigator.clipboard.writeText(e.currentTarget.innerText);
		copied = true;
		if (copiedTimeout !== undefined) clearTimeout(copiedTimeout);
		copiedTimeout = setTimeout(() => (copied = false), 2000);
	}}
>
	{installCode}
</code>

<p class="opacity-0 transition" class:opacity-100={copied}>copied to clipboard</p>

<h2 class="text-2xl font-bold mb-4">Usage</h2>

<p class="" >MathML is more recommended since MathSVG bundle size is not small.</p>

<h3 class="text-2xl font-bold mt-4 mb-2">MathML</h3>

<Highlight class="select-all rounded ring-2" language={typescript} code={exmapleCode} />

<h3 class="text-2xl font-bold mt-4 mb-2">MathSVG</h3>

<Highlight class="select-all rounded ring-2" language={typescript} code={exmapleCode2} />
