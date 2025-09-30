import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MathML from '../lib/v4/MathML.svelte';

describe('MathML (Svelte 4)', () => {
	it('renders basic TeX expression', () => {
		render(MathML, { props: { tex: 'x = 1' } });
		const mathElement = screen.getByText((content, element) => {
			return element?.tagName === 'MATH';
		});
		expect(mathElement).toBeInTheDocument();
	});

	it('renders quadratic formula correctly', () => {
		const tex = 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
		render(MathML, { props: { tex } });
		const mathElement = screen.getByText((content, element) => {
			return element?.tagName === 'MATH';
		});
		expect(mathElement).toBeInTheDocument();
		expect(mathElement).toHaveTextContent('x');
	});

	it('handles complex expressions', () => {
		const tex = '\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n';
		render(MathML, { props: { tex } });
		const mathElement = screen.getByText((content, element) => {
			return element?.tagName === 'MATH';
		});
		expect(mathElement).toBeInTheDocument();
	});

	it('accepts temml options', () => {
		const tex = 'x^2';
		const temmlOptions = { displayMode: true };
		render(MathML, { props: { tex, temmlOptions } });
		const mathElement = screen.getByText((content, element) => {
			return element?.tagName === 'MATH';
		});
		expect(mathElement).toBeInTheDocument();
	});

	it('handles empty tex input', () => {
		render(MathML, { props: { tex: '' } });
		const mathElement = screen.getByText((content, element) => {
			return element?.tagName === 'MATH';
		});
		expect(mathElement).toBeInTheDocument();
	});

	it('handles special characters', () => {
		const tex = '\\alpha + \\beta = \\gamma';
		render(MathML, { props: { tex } });
		const mathElement = screen.getByText((content, element) => {
			return element?.tagName === 'MATH';
		});
		expect(mathElement).toBeInTheDocument();
	});
});