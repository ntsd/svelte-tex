<script lang="ts">
	import { githubLink, npmLink } from '../const.ts';
	import GithubIcon from './GithubIcon.svelte';
</script>

<footer class="mx-auto justify-items-center gap-4 p-5 pt-10">
	<div class="flex flex-row items-center justify-center gap-8 md:gap-12">
		<GithubIcon />
		<a aria-label="NPM" target="_blank" href={npmLink} rel="noopener" class="hover:text-gray-600">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 576 512"
				width="20"
				height="20"
				class="inline-block h-14 w-14 fill-current md:h-20 md:w-20"
				><path
					d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"
				/></svg
			>
		</a>
	</div>
	<div class="mt-4 grid grid-cols-1 justify-items-center xl:grid-cols-2">
		<p>
			This project is <a
				class="underline hover:text-gray-600"
				href={githubLink + '/blob/main/LICENSE'}>Open-source License</a
			>
		</p>
		<p>
			Copyright (c) 2023
			<a class="underline hover:text-gray-600" href="https://ntsd.dev">Jirawat Boonkumnerd</a>
		</p>
	</div>
</footer>
