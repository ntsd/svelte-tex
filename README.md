# svelte-tex

[![npm version](https://badge.fury.io/js/svelte-tex.svg)](https://www.npmjs.com/package/svelte-tex)

Svelte Component to convert [TeX](https://en.wikipedia.org/wiki/TeX) to rendered SVG using [MathJax](https://github.com/mathjax/MathJax) or rendered MathML using [Temml](https://github.com/ronkok/Temml).

[Try It Online](https://ntsd.github.io/svelte-tex)

## Features

- Convert TeX to SVG using [MathJax](https://github.com/mathjax/MathJax)
- Convert TeX to MathML using [Temml](https://github.com/ronkok/Temml)
- Support MathJax options
- Support Temml options

## Installation

`npm install svelte-tex`

## Usage

> `MathML` is more recommended since `MathSVG` bundle size is huge, It will good with prerender mode.

### MathML

```ts
<script lang="ts">
  import MathML from 'svelte-tex/package/MathML.svelte';

  // use String.raw to escape `\`
  const tex = String.raw`\frac{(n^2+n)(2n+1)}{6}`;
</script>

<MathML {tex} />
// or include Temml options
<MathML {tex} temmlOptions={{}} />
```

### MathSVG

```ts
<script lang="ts">
  import MathSVG from 'svelte-tex/package/MathSVG.svelte';

  // use String.raw to escape `\`
  const tex = String.raw`\frac{(n^2+n)(2n+1)}{6}`;
</script>

<MathSVG {tex} />
// or include MathJax options
<MathSVG {tex} texOptions={{}} svgOptions={{ fontCache: 'local' }} />
```

> :warning: MathSVG is not small for bundle size.

MathJax is not supports TypeScript for options yet

check texOptions from https://docs.mathjax.org/en/latest/options/input/tex.html#tex-input-processor-options

check svgOptions from https://docs.mathjax.org/en/latest/options/output/svg.html#svg-options
