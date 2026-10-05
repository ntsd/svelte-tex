import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MathSVG from '../lib/MathSVG.svelte';

describe('query probe', () => {
	it('single test, loose predicate', () => {
		const { container } = render(MathSVG, { props: { tex: 'x = 1' } });
		// How many elements does the loose predicate match?
		const el = container.querySelector('svg');
		console.log('container svg children that match predicate:');
		const all = document.body.querySelectorAll('*');
		let matches = 0;
		all.forEach((e: any) => { if (e?.tagName === 'SVG' || e?.querySelector('svg')) matches++; });
		console.log('total body elements matching loose predicate =', matches);
		try {
			screen.getByText((c: any, e: any) => e?.tagName === 'SVG' || e?.querySelector('svg'));
			console.log('getByText: single OK');
		} catch (err: any) { console.log('getByText threw:', err?.message?.split('\n')[0]); }
	});
});
