import { describe, it, expect } from 'vitest';
import temml from 'temml';

describe('Basic MathML functionality', () => {
	it('can render TeX to MathML string', () => {
		const tex = 'x = 1';
		const result = temml.renderToString(tex);
		expect(result).toContain('<math');
		expect(result).toContain('</math>');
	});

	it('handles more complex expressions', () => {
		const tex = '\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
		const result = temml.renderToString(tex);
		expect(result).toContain('<math');
		expect(result).toContain('</math>');
	});
});