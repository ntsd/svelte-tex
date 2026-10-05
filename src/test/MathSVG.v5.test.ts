import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MathSVG from '../lib/MathSVG.svelte';

describe('MathSVG (Svelte 5)', () => {
	it('renders basic TeX expression as SVG', () => {
		const { container } = render(MathSVG, { props: { tex: 'x = 1' } });
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('renders quadratic formula as SVG', () => {
		const tex = 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
		const { container } = render(MathSVG, { props: { tex } });
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('handles complex expressions with summation', () => {
		const tex = '\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n';
		const { container } = render(MathSVG, { props: { tex } });
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('accepts TeX options using $props syntax', () => {
		const tex = 'x^2';
		const texOptions = { packages: ['base'] };
		const { container } = render(MathSVG, { props: { tex, texOptions } });
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('accepts SVG options using $props syntax', () => {
		const tex = 'y = mx + b';
		const svgOptions = { fontCache: 'none' };
		const { container } = render(MathSVG, { props: { tex, svgOptions } });
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('handles empty tex input', () => {
		const { container } = render(MathSVG, { props: { tex: '' } });
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('handles Greek letters', () => {
		const tex = '\\alpha + \\beta = \\gamma';
		const { container } = render(MathSVG, { props: { tex } });
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('does not throw on invalid TeX and shows the error fallback', () => {
		// Unclosed \frac: mathjax-full reports this via a `data-mjx-error`
		// marker node. The component must surface a graceful fallback instead
		// of letting the error SVG (or any thrown error) crash the tree.
		const { container } = render(MathSVG, { props: { tex: '\\frac{1}' } });

		// No misleading error SVG is rendered…
		expect(container.querySelector('svg')).not.toBeInTheDocument();
		// …and a clearly-marked fallback carrying the source + message is.
		const error = container.querySelector('.mathsvg-error');
		expect(error).toBeInTheDocument();
		expect(error?.textContent).toContain('\\frac{1}');
		expect(error?.textContent).toContain('Missing argument');
	});

	it('escapes special characters in the error fallback', () => {
		// Invalid TeX (missing \frac arg) containing markup-significant
		// characters: they must be HTML-escaped, not injected raw.
		const tex = 'a < b & c \\frac{1}';
		const { container } = render(MathSVG, { props: { tex } });

		const error = container.querySelector('.mathsvg-error');
		expect(error).toBeInTheDocument();
		// Raw text is present but the underlying markup is escaped.
		expect(error?.textContent).toContain('a < b & c');
		expect(error?.innerHTML).toContain('a &lt; b &amp; c');
		expect(container.querySelector('svg')).not.toBeInTheDocument();
	});
});
