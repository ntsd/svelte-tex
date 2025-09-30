import { describe, it, expect } from 'vitest';
import packageJson from '../../package.json' with { type: 'json' };

describe('Package exports validation', () => {
	it('validates all package.json exports exist', () => {
		const exports = packageJson.exports;
		
		// Check main exports
		expect(exports['./package.json']).toBeDefined();
		expect(exports['./package/MathML.svelte']).toBeDefined();
		expect(exports['./package/MathSVG.svelte']).toBeDefined();
		
		// Check v4 exports
		expect(exports['./package/v4/MathML.svelte']).toBeDefined();
		expect(exports['./package/v4/MathSVG.svelte']).toBeDefined();
		
		// Check that index exports are NOT present
		expect('.' in exports).toBe(false);
		expect('./v4' in exports).toBe(false);
	});

	it('validates peer dependencies support both versions', () => {
		const peerDeps = packageJson.peerDependencies;
		
		expect(peerDeps.svelte).toBe('^4.x || ^5.x');
	});

	it('validates test scripts are configured', () => {
		const scripts = packageJson.scripts;
		
		expect(scripts.test).toBeDefined();
		expect(scripts['test:ui']).toBeDefined();
		expect(scripts['test:coverage']).toBeDefined();
	});
});