import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MathSVG from '../lib/MathSVG.svelte';

describe('MathSVG (Svelte 5)', () => {
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

	it('accepts TeX options using $props syntax', () => {
		const tex = 'x^2';
		const texOptions = { packages: ['base'] };
		const { container } = render(MathSVG, { props: { tex, texOptions } });
		const svgElement = container.querySelector('svg');
		expect(svgElement).not.toBeNull();
		expect(svgElement?.isConnected).toBe(true);
	});

	it('accepts SVG options using $props syntax', () => {
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

	it('works with reactive updates', async () => {
		const { container, rerender } = render(MathSVG, { props: { tex: 'x = 1' } });

		// Update the prop (Svelte 5: use rerender, not $set)
		await rerender({ tex: 'y = 2x + 1' });

		const svgElement = container.querySelector('svg');
		expect(svgElement).not.toBeNull();
		expect(svgElement?.isConnected).toBe(true);
	});
});
