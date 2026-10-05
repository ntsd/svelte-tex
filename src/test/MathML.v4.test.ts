import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MathML from '../lib/v4/MathML.svelte';

const getMathElement = (container: HTMLElement) => container.querySelector('math');

describe('MathML (Svelte 4)', () => {
	it('renders basic TeX expression', () => {
		const { container } = render(MathML, { props: { tex: 'x = 1' } });
		const mathElement = getMathElement(container);
		expect(mathElement).not.toBeNull();
	});

	it('renders quadratic formula correctly', () => {
		const tex = 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
		const { container } = render(MathML, { props: { tex } });
		const mathElement = getMathElement(container);
		expect(mathElement).not.toBeNull();
		expect(mathElement?.textContent).toContain('x');
	});

	it('handles complex expressions', () => {
		const tex = '\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n';
		const { container } = render(MathML, { props: { tex } });
		const mathElement = getMathElement(container);
		expect(mathElement).not.toBeNull();
	});

	it('accepts temml options', () => {
		const tex = 'x^2';
		const temmlOptions = { displayMode: true };
		const { container } = render(MathML, { props: { tex, temmlOptions } });
		const mathElement = getMathElement(container);
		expect(mathElement).not.toBeNull();
	});

	it('handles empty tex input', () => {
		const { container } = render(MathML, { props: { tex: '' } });
		const mathElement = getMathElement(container);
		expect(mathElement).not.toBeNull();
	});

	it('handles special characters', () => {
		const tex = '\\alpha + \\beta = \\gamma';
		const { container } = render(MathML, { props: { tex } });
		const mathElement = getMathElement(container);
		expect(mathElement).not.toBeNull();
	});
});
