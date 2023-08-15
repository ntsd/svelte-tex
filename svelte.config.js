import adapter from '@sveltejs/adapter-static';
import htmlMinifierAdapter from 'sveltekit-html-minifier';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		adapter: htmlMinifierAdapter(adapter())
	}
};

export default config;
