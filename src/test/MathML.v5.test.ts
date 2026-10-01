import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MathML from '../lib/MathML.svelte';

describe('MathML (Svelte 5)', () => {
	it('renders basic TeX expression', () => {
		const { container } = render(MathML, { props: { tex: 'x = 1' } });
		const mathElement = container.querySelector('math');
		expect(mathElement).not.toBeNull();
		expect(mathElement?.isConnected).toBe(true);
	});

	it('renders quadratic formula correctly', () => {
		const tex = 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
		const { container } = render(MathML, { props: { tex } });
		const mathElement = container.querySelector('math');
		expect(mathElement).not.toBeNull();
		expect(mathElement?.isConnected).toBe(true);
		expect(mathElement?.querySelector('mfrac')).not.toBeNull();
		expect(mathElement?.querySelector('msqrt')).not.toBeNull();
		expect(mathElement?.textContent).toContain('x');
	});

	it('handles complex expressions', () => {
		const tex = '\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n';
		const { container } = render(MathML, { props: { tex } });
		const mathElement = container.querySelector('math');
		expect(mathElement).not.toBeNull();
		expect(mathElement?.isConnected).toBe(true);
		expect(mathElement?.querySelector('msubsup')).not.toBeNull();
	});

	it('accepts temml options using $props syntax', () => {
		const tex = 'x^2';
		const temmlOptions = { displayMode: true };
		const { container } = render(MathML, { props: { tex, temmlOptions } });
		const mathElement = container.querySelector('math');
		expect(mathElement).not.toBeNull();
		expect(mathElement?.isConnected).toBe(true);
	});

	it('handles empty tex input', () => {
		const { container } = render(MathML, { props: { tex: '' } });
		const mathElement = container.querySelector('math');
		expect(mathElement).not.toBeNull();
		expect(mathElement?.isConnected).toBe(true);
	});

	it('handles special characters', () => {
		const tex = '\\alpha + \\beta = \\gamma';
		const { container } = render(MathML, { props: { tex } });
		const mathElement = container.querySelector('math');
		expect(mathElement).not.toBeNull();
		expect(mathElement?.isConnected).toBe(true);
	});

	it('works with reactive updates', async () => {
		const { container, rerender } = render(MathML, { props: { tex: 'x = 1' } });

		// Update the prop (Svelte 5: use rerender, not $set)
		await rerender({ tex: 'y = 2' });

		const mathElement = container.querySelector('math');
		expect(mathElement).not.toBeNull();
		expect(mathElement?.isConnected).toBe(true);
	});

	it('does not throw on invalid TeX and shows the error fallback', () => {
		const { container } = render(MathML, { props: { tex: '\\sqrt' } });
		// temml renders its own error span by default; the component must not throw
		expect(container.querySelector('.temml-error')).toBeInTheDocument();
	});

	it('does not rethrow when temml throws (throwOnError) and shows the error fallback', () => {
		const { container } = render(MathML, {
			props: { tex: 'x = \\frac{1}', temmlOptions: { throwOnError: true } }
		});
		expect(container.querySelector('math')).not.toBeInTheDocument();
		const error = container.querySelector('.temml-error');
		expect(error).toBeInTheDocument();
		expect(error?.textContent).toContain('ParseError');
		expect(error?.textContent).toContain('x = \\frac{1}');
	});
});
