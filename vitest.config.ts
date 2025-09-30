/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		svelte({ 
			hot: !process.env.VITEST,
			configFile: false,
			compilerOptions: {
				// Dynamically decide runes based on file path
				runes: undefined // Let each file decide based on its content
			}
		})
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts']
	},
	optimizeDeps: {
		include: ['@testing-library/svelte'],
		exclude: ['svelte']
	}
});