import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MathSVG from '../lib/v4/MathSVG.svelte';

describe('MathSVG (Svelte 4)', () => {
	it('renders basic TeX expression as SVG', () => {
		const { container } = render(MathSVG, { props: { tex: 'x = 1' } });
		const svgElement = container.querySelector('svg');
		expect(svgElement).not.toBeNull();
		expect(svgElement?.isConnected).toBe(true);
	});

	it('renders quadratic formula as SVG', () => {
		const tex = '\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
		const { container } = render(MathSVG, { props: { tex } });
		const svgElement = container.querySelector('svg');
		expect(svgElement).not.toBeNull();
		expect(svgElement?.isConnected).toBe(true);
	});

	it('handles complex expressions with summation', () => {
		const tex = '\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n';
		const { container } = render(MathSVG, { props: { tex } });
		const svgElement = container.querySelector('svg');
		expect(svgElement).not.toBeNull();
		expect(svgElement?.isConnected).toBe(true);
	});

	it('accepts TeX options', () => {
		const tex = 'x^2';
		const texOptions = { packages: ['base'] };
		const { container } = render(MathSVG, { props: { tex, texOptions } });
		const svgElement = container.querySelector('svg');
		expect(svgElement).not.toBeNull();
		expect(svgElement?.isConnected).toBe(true);
	});

	it('accepts SVG options', () => {
		const tex = 'y = mx + b';
		const svgOptions = { fontCache: 'none' };
		const { container } = render(MathSVG, { props: { tex, svgOptions } });
		const svgElement = container.querySelector('svg');
		expect(svgElement).not.toBeNull();
		expect(svgElement?.isConnected).toBe(true);
	});

	it('handles empty tex input', () => {
		const { container } = render(MathSVG, { props: { tex: '' } });
		const svgElement = container.querySelector('svg');
		expect(svgElement).not.toBeNull();
		expect(svgElement?.isConnected).toBe(true);
	});

	it('handles Greek letters', () => {
		const tex = '\\alpha + \\beta = \\gamma';
		const { container } = render(MathSVG, { props: { tex } });
		const svgElement = container.querySelector('svg');
		expect(svgElement).not.toBeNull();
		expect(svgElement?.isConnected).toBe(true);
	});

	it('rebuilds the MathJax document when svgOptions change', async () => {
		const { container, rerender } = render(MathSVG, {
			props: { tex: 'x = 1', svgOptions: { fontCache: 'local' } }
		});
		// fontCache 'local' inlines a shared <defs> of <path> glyphs
		expect(container.querySelector('defs path')).not.toBeNull();

		// Rerender with a different option value: the output must reflect the new option
		await rerender({ tex: 'x = 1', svgOptions: { fontCache: 'none' } });
		expect(container.querySelector('defs path')).toBeNull();
	});
});
