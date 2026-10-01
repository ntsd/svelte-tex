import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MathML from '../lib/v4/MathML.svelte';

describe('MathML (Svelte 4)', () => {
	it('renders basic TeX expression', () => {
		const { container } = render(MathML, { props: { tex: 'x = 1' } });
		// jsdom keeps the MathML namespace, so <math> is neither an HTMLElement
		// nor an SVGElement — jest-dom matchers reject it, assert directly.
		expect(container.querySelector('math')).toBeTruthy();
	});

	it('renders quadratic formula correctly', () => {
		const tex = 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
		const { container } = render(MathML, { props: { tex } });
		const mathElement = container.querySelector('math');
		expect(mathElement).toBeTruthy();
		expect(mathElement?.textContent).toContain('x');
	});

	it('handles complex expressions', () => {
		const tex = '\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n';
		const { container } = render(MathML, { props: { tex } });
		expect(container.querySelector('math')).toBeTruthy();
	});

	it('accepts temml options', () => {
		const tex = 'x^2';
		const temmlOptions = { displayMode: true };
		const { container } = render(MathML, { props: { tex, temmlOptions } });
		expect(container.querySelector('math')).toBeTruthy();
	});

	it('handles empty tex input', () => {
		const { container } = render(MathML, { props: { tex: '' } });
		expect(container.querySelector('math')).toBeTruthy();
	});

	it('handles special characters', () => {
		const tex = '\\alpha + \\beta = \\gamma';
		const { container } = render(MathML, { props: { tex } });
		expect(container.querySelector('math')).toBeTruthy();
	});
});
