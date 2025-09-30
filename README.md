# svelte-tex

[![npm version](https://badge.fury.io/js/svelte-tex.svg)](https://www.npmjs.com/package/svelte-tex)

Svelte Component to convert [TeX](https://en.wikipedia.org/wiki/TeX) to rendered SVG using [MathJax](https://github.com/mathjax/MathJax) or rendered MathML using [Temml](https://github.com/ronkok/Temml).

[Try It Online](https://ntsd.github.io/svelte-tex)

*Supports both Svelte 4 and Svelte 5*

## Compatibility

- **Svelte 4**: Use components from `svelte-tex/package/v4`
- **Svelte 5**: Use components from `svelte-tex/package` (default)

## Features

- Convert TeX to SVG using [MathJax](https://github.com/mathjax/MathJax)
- Convert TeX to MathML using [Temml](https://github.com/ronkok/Temml)
- Support MathJax options
- Support Temml options

## Installation

`npm install svelte-tex`

## Usage

> **`MathML` is more recommended since `MathSVG` bundle size is not small.**

### Svelte 5 Usage

#### MathML

```ts
<script lang="ts">
  import MathML from 'svelte-tex/package/MathML.svelte';

  // use String.raw to escape `\`
  const tex = String.raw`\frac{(n^2+n)(2n+1)}{6}`;
</script>

<MathML {tex} />
<!-- or include Temml options -->
<MathML {tex} temmlOptions={{}} />
```

#### MathSVG

```ts
<script lang="ts">
  import MathSVG from 'svelte-tex/package/MathSVG.svelte';

  // use String.raw to escape `\`
  const tex = String.raw`\frac{(n^2+n)(2n+1)}{6}`;
</script>

<MathSVG {tex} />
<!-- or include MathJax options -->
<MathSVG {tex} texOptions={{}} svgOptions={{ fontCache: 'local' }} />
```

### Svelte 4 Usage

#### MathML

```ts
<script lang="ts">
  import MathML from 'svelte-tex/package/v4/MathML.svelte';

  // use String.raw to escape `\`
  const tex = String.raw`\frac{(n^2+n)(2n+1)}{6}`;
</script>

<MathML {tex} />
<!-- or include Temml options -->
<MathML {tex} temmlOptions={{}} />
```

#### MathSVG

```ts
<script lang="ts">
  import MathSVG from 'svelte-tex/package/v4/MathSVG.svelte';

  // use String.raw to escape `\`
  const tex = String.raw`\frac{(n^2+n)(2n+1)}{6}`;
</script>

<MathSVG {tex} />
<!-- or include MathJax options -->
<MathSVG {tex} texOptions={{}} svgOptions={{ fontCache: 'local' }} />
```

> :warning: MathSVG is not small for bundle size.

MathJax is not supports TypeScript for options yet

check texOptions from https://docs.mathjax.org/en/latest/options/input/tex.html#tex-input-processor-options

check svgOptions from https://docs.mathjax.org/en/latest/options/output/svg.html#svg-options

## Development

### Testing

The package includes comprehensive tests for both Svelte 4 and Svelte 5 components:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Version Support

- **Svelte 4 components**: Located in `/src/lib/v4/` - use traditional `export let` syntax
- **Svelte 5 components**: Located in `/src/lib/` - use modern `$props()` syntax

Both versions provide identical functionality with different syntax approaches for maximum compatibility.
