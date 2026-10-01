import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MathML from '../lib/MathML.svelte';

describe('MathML (Svelte 5)', () => {
	it('renders basic TeX expression', () => {
		const { container } = render(MathML, { props: { tex: 'x = 1' } });
		const mathElement = container.querySelector('math');
		// jsdom keeps the MathML namespace, so <math> is neither an HTMLElement
		// nor an SVGElement — jest-dom matchers reject it, assert directly.
		expect(mathElement).toBeTruthy();
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

	it('accepts temml options using $props syntax', () => {
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

	it('works with reactive updates', async () => {
		const { container, rerender } = render(MathML, { props: { tex: 'x = 1' } });

		const mathElement = container.querySelector('math');
		expect(mathElement).toBeTruthy();
		expect(mathElement?.textContent).toContain('x');
		expect(mathElement?.textContent).not.toContain('y');

		// Update the prop reactively on the mounted instance
		await rerender({ tex: 'y = 2' });

		const updatedMathElement = container.querySelector('math');
		expect(updatedMathElement).toBeTruthy();
		expect(updatedMathElement?.textContent).toContain('y');
		expect(updatedMathElement?.textContent).not.toContain('x');
	});
});
