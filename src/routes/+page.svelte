<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let ready = false;
	onMount(() => {
		ready = true;
	});
</script>

<svelte:head>
	<title>Kelvin Soh</title>
</svelte:head>

<main>
	<div class="prose">
		<div class="blackboard">
			<h1>
				<span> Kelvin Soh </span>
			</h1>
			<span class="yellow">Math</span><span class="blue">Education</span><span class="pink"
				>Code</span
			>
			{#if ready}
				<div class="chalk" in:fade={{ delay: 500, duration: 200 }} />
			{/if}
		</div>
		<p>
			Hi there! I'm Kelvin from Singapore. I teach Mathematics, mainly at the high school (JC)
			level, and have been doing so for 10+ very fruitful years.
		</p>
		<p>
			I started dabbling into coding the last 5+ years and this side hobby has now morphed into my
			main passion. With the potential to reach and impact many more people, I am excited to dive
			deeper into this area in the future.
		</p>
		<p>
			In particular, I am most excited to explore and work on high quality
			<strong> digitalization of educational content </strong>. This is too often an afterthought
			(think students accessing pdf notes on their phones). The future should be more like our
			favorite web apps with responsive design that scale depending on whether we are on a phone,
			desktop or in physical lessons.
		</p>

		<h2>Main Projects</h2>
		<p>The following are some of my projects that showcase my ideas.</p>

		<h3>Math Repo</h3>
		<p>
			<a href="https://math-repo.vercel.app">Math Repo</a>
			contains solutions to past national exams, with easier navigation (both topical and yearly) between
			questions.
		</p>
		<p>The solutions are generated programmatically in JavaScript. This allows for</p>
		<ul>
			<li>
				A better content workflow (no more working out answers on paper and then typing those out
				afterwards)
			</li>
			<li>Easier rectification of errors and typos using source control</li>
			<li>Modification of said questions (as implemented in <a href="#math-pro">Math Pro</a>)</li>
		</ul>
		<h3 id="math-pro">Math Pro</h3>
		<p>
			<a href="https://math-pro.vercel.app">Math Pro</a> contains questions and short quizzes for practice.
			These questions all contain random elements, so students can practice the same concept multiple
			times with slight variations, leading to better retention of knowledge.
		</p>
		<h3>3D Vectors</h3>
		<p>
			<a href="https://3d-vectors.vercel.app">3D Vectors</a> is a small applet that helps students with
			questions about 3D vectors.
		</p>
		<h2>Works in Progress</h2>
		<h3>Mathlified Framework</h3>
		<p>
			Printed notes and worksheets are still really useful for physical lessons, but the workflow to
			produce them (e.g. using Microsoft Word or LaTeX) is different from the web based pipeline in
			the projects above.
		</p>
		<p>
			I have created the
			<a href="/mathlified">Mathlified</a> framework that allows for the creation of web based math content,
			while generating high quality pdfs at the same time.
		</p>
		<p>
			It is still unpolished (pending documentation efforts, bug fixes for edge cases, and features
			for more customization), but I am already using it internally to produce all my new material,
			and have thrown together a demo
			<a href="/mathlified">here</a>.
		</p>
		<h3>Notes and Examples</h3>
		<p>
			Notes are most effective when students use them actively (i.e. trying out the examples instead
			of passively reading them). My latest projects (<a href="/math-cat">demo 1</a> and
			<a href="https://mathlify.com/h2/learn/functions/concepts/intervals/theory">demo 2</a>) aims
			to integrate the two (explanation and examples), so that students can try out the (randomized)
			examples while referring to the explanations if necessary.
		</p>
		<h2>Open Source Libraries</h2>
		<p>
			I have benefitted greatly from the open source community, and like to give back. In addition
			to occasional bug fixes and contributions to libraries I'm using, I have also open sourced a
			few projects of my own:
		</p>
		<h3>Mathlify and Mathlifier</h3>
		<p>
			The mathematical projects above are powered by my open source libraries
			<a href="https://www.npmjs.com/package/mathlify">Mathlify</a> (JavaScript computer algebra
			system that integrates calculations with typesetting) and
			<a href="https://www.npmjs.com/package/mathlifier?activeTab=readme">Mathlifier</a> (library to
			enable cross-platform (web and print) math content). The latter is actually used by other developers
			to power math content on their blogs.
		</p>
		<h3>Others</h3>
		<p>
			My other projects can be found on <a href="https://github.com/kelvinsjk">GitHub</a>.
		</p>
		<h2>Just for Fun</h2>
		<p>Some fun simple applets that everyone can use!</p>
		<h3>Spinner Dinner</h3>
		<p>
			If you're like me, you can't decide what to eat for dinner.
			<a href="https://spinner-dinner.netlify.app"> Spin the wheel </a>
			to let the app decide for you!
		</p>
		<h3>Countdown Confetti</h3>
		<p>
			Counting down towards an important date/time?
			<a href="https://countdown-confetti.vercel.app"> Countdown Confetti </a>
			will shower you with fireworks and confetti to celebrate the occasion!
		</p>
	</div>
</main>

<style>
	main {
		background-color: #fffff1;
		min-height: 100vh;
	}
	.prose {
		margin-inline: auto;
		padding: 1em;
	}
	.blackboard {
		padding-block: 1em;
		font-size: 1.5em;
		background-color: #274c43;
		border: 5px solid #7d280b;
		color: white;
		text-align: center;
		position: relative;
	}
	.yellow {
		color: #ffffbe;
		padding-inline: 0.5em;
		border-right: 3px solid white;
	}
	.blue {
		color: #beffff;
		padding-inline: 0.5em;
		border-right: 3px solid white;
	}
	.pink {
		padding-inline: 0.5em;
		color: #ffbedf;
	}
	h1 {
		font-size: 1.5em;
		font-weight: 500;
		color: white;
		margin-bottom: 1rem;
		position: relative;
	}
	h1::after {
		content: '';
		position: absolute;
		left: calc((100% - 10rem) / 2 + 1rem);
		bottom: 2px;
		width: 10rem;
		height: 10px;
		transform: skew(-30deg);
		background: rgba(255, 255, 255, 0.8);
		animation: slideInFromLeft 500ms ease-in-out;
	}
	@keyframes slideInFromLeft {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: skew(-30deg) translateX(0);
		}
	}
	.chalk {
		position: absolute;
		width: 2rem;
		background-color: white;
		height: 0.5rem;
		right: 0;
		bottom: 0;
		border-radius: 1rem;
	}
</style>
