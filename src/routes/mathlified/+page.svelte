<script>
	import { qns } from './_qns';
	import Qns from '$lib/mathlified/components/Qns.svelte';
</script>

<main class="prose">
	<h1>Mathlified Framework Demo</h1>
	<p>
		The following page, along with
		<a href="/mathlified.pdf">this pdf</a>
		is generated using 
		<a href="https://github.com/kelvinsjk/kelvinsoh/blob/main/src/routes/mathlified/_qns.ts">		
			a single source of truth in a TypeScript file.
		</a>
	</p>
	<p>
		Any changes to the TypeScript file
		will be reflected in both the pdf and the web page
		instantly.
	</p>

	<hr />
	<Qns { qns } />
</main>

<style>
	main {
		padding: 1rem;
		font-size: 21px;
		margin-inline: auto;
	}
</style>