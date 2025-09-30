import { describe, it, expect } from 'vitest';

describe('Component imports', () => {
	it('can import individual Svelte 5 components', async () => {
		const MathML = await import('../lib/MathML.svelte');
		const MathSVG = await import('../lib/MathSVG.svelte');
		expect(MathML).toBeDefined();
		expect(MathSVG).toBeDefined();
	});

	it('can import individual Svelte 4 components', async () => {
		const MathML = await import('../lib/v4/MathML.svelte');
		const MathSVG = await import('../lib/v4/MathSVG.svelte');
		expect(MathML).toBeDefined();
		expect(MathSVG).toBeDefined();
	});
});