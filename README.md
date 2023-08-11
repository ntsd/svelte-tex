# svelte-tex

[![npm version](https://badge.fury.io/js/svelte-tex.svg)](https://www.npmjs.com/package/svelte-tex)

Svelte Component to convert [TeX](https://en.wikipedia.org/wiki/TeX) to rendered SVG using [MathJax](https://github.com/mathjax/MathJax) or rendered MathML using [Temml](https://github.com/ronkok/Temml)

[Try It Online](https://ntsd.github.io/svelte-tex)

## Features

- Convert TeX to SVG using [MathJax](https://github.com/mathjax/MathJax)
- Convert TeX to MathML using [Temml](https://github.com/ronkok/Temml)
- Support MathJax options
- Support Temml options

## Installation

`npm install svelte-tex`

## Example

```ts
<script lang="ts">
// alternative import
// import { MathML, MathSVG } from 'svelte-tex';
  import MathML from 'svelte-tex/mathml';
  import MathSVG from 'svelte-tex/mathsvg';

  const tex = String.raw`\frac{(n^2+n)(2n+1)}{6}`;
</script>

<MathML {tex} temmlOptions={{}} />

<MathSVG {tex} texOptions={{}} svgOptions={{ fontCache: 'local' }} />
```

MathJax is not supports TypeScript for options yet

check texOptions from https://docs.mathjax.org/en/latest/options/input/tex.html#tex-input-processor-options

check svgOptions from https://docs.mathjax.org/en/latest/options/output/svg.html#svg-options
