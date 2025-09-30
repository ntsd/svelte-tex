import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MathSVG from '../lib/MathSVG.svelte';

describe('MathSVG (Svelte 5)', () => {
	it('renders basic TeX expression as SVG', () => {
		render(MathSVG, { props: { tex: 'x = 1' } });
		const svgElement = screen.getByText((content: any, element: any) => {
			return element?.tagName === 'SVG' || element?.querySelector('svg');
		});
		expect(svgElement).toBeInTheDocument();
	});

	it('renders quadratic formula as SVG', () => {
		const tex = 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
		render(MathSVG, { props: { tex } });
		const svgElement = screen.getByText((content: any, element: any) => {
			return element?.tagName === 'SVG' || element?.querySelector('svg');
		});
		expect(svgElement).toBeInTheDocument();
	});

	it('handles complex expressions with summation', () => {
		const tex = '\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n';
		render(MathSVG, { props: { tex } });
		const svgElement = screen.getByText((content: any, element: any) => {
			return element?.tagName === 'SVG' || element?.querySelector('svg');
		});
		expect(svgElement).toBeInTheDocument();
	});

	it('accepts TeX options using $props syntax', () => {
		const tex = 'x^2';
		const texOptions = { packages: ['base'] };
		render(MathSVG, { props: { tex, texOptions } });
		const svgElement = screen.getByText((content: any, element: any) => {
			return element?.tagName === 'SVG' || element?.querySelector('svg');
		});
		expect(svgElement).toBeInTheDocument();
	});

	it('accepts SVG options using $props syntax', () => {
		const tex = 'y = mx + b';
		const svgOptions = { fontCache: 'none' };
		render(MathSVG, { props: { tex, svgOptions } });
		const svgElement = screen.getByText((content: any, element: any) => {
			return element?.tagName === 'SVG' || element?.querySelector('svg');
		});
		expect(svgElement).toBeInTheDocument();
	});

	it('handles empty tex input', () => {
		render(MathSVG, { props: { tex: '' } });
		const svgElement = screen.getByText((content: any, element: any) => {
			return element?.tagName === 'SVG' || element?.querySelector('svg');
		});
		expect(svgElement).toBeInTheDocument();
	});

	it('handles Greek letters', () => {
		const tex = '\\alpha + \\beta = \\gamma';
		render(MathSVG, { props: { tex } });
		const svgElement = screen.getByText((content: any, element: any) => {
			return element?.tagName === 'SVG' || element?.querySelector('svg');
		});
		expect(svgElement).toBeInTheDocument();
	});

	it('works with reactive updates', () => {
		const { component } = render(MathSVG, { props: { tex: 'x = 1' } });
		
		// Update the prop
		component.$set({ tex: 'y = 2x + 1' });
		
		const svgElement = screen.getByText((content: any, element: any) => {
			return element?.tagName === 'SVG' || element?.querySelector('svg');
		});
		expect(svgElement).toBeInTheDocument();
	});
});