<script lang="ts">
  import { fly, scale } from 'svelte/transition';
  import { content } from './content';
	import { math } from 'mathlifier';
  import {goto} from '$app/navigation';
  import {page} from '$app/stores';
	import { browser } from '$app/environment';
  
  const {title, body,steps} = content;
  let learnActive = true;
  function setLearnActive(active: boolean) {
    learnActive = active;
  }

  // practice
  import { vars } from './variables';
  import { getRandomInt } from 'mathlify';
  import { qnGen } from '$lib/qnGen/01-eqns/q010101';
  let variables = getNewVars();
  $: [qn, ans, soln] = qnGen(variables);

  // make heights match
  let height: number;
  let div: HTMLDivElement;
  $: setMaxHeight(learnActive);
  function setMaxHeight(learnActive: boolean): void {
    if (div){
      if (learnActive) {
        div.style.height = '100%';
      } else {
        div.style.height = `${height}px`;
      }
    }
  }

  type Variables = typeof vars[0];
  function getNewVars(): Variables {
    const variables =  vars[getRandomInt(0, vars.length - 1)];
    if (browser){
      goto(`${$page.route.id}?vars=${variables.id}`, {replaceState: true, noScroll: true, keepFocus: true});
    }
    return variables
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>


<main class="prose">
  <h1>{title}</h1>
  <div class="tabs">
    <button
      class="tab tab-lifted"
      class:tab-active={learnActive}
      on:click={() => setLearnActive(true)}
    >
    {#if learnActive}
      <div class="highlight" in:fly={{x: 200, duration: 500}}></div>
    {/if}
      Learn
    </button> 
    <button 
      class="tab tab-lifted"
      class:tab-active={!learnActive}
      on:click={() => setLearnActive(false)}
    >
    {#if !learnActive}
      <div class="highlight" in:fly={{x: -200, duration: 500}}></div>
    {/if}
      Practice
    </button> 
  </div>
  <div class="body">
    <label class="swap swap-flip">
      <input type="checkbox" disabled checked={learnActive} />
      <div class="swap-on" bind:this={div}>
        <h2 class="mt-2">Example with comments</h2>
        <h3>Question</h3>
        {@html body}
        <h3>Solution</h3>
        {#each steps as step,i}
        <h4>Step {i}. {step.title}</h4>
        <div>
          {@html step.body}
        </div>
        {#if "info" in step}
        <div class="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>{@html step.info}</div>
        </div>
        {/if}
        {/each}
        <h2>Practice</h2>
        <button 
          class="btn btn-secondary"
          on:click={() => {setLearnActive(false); window.scroll({top: 0});}}
        >
          Try out this technique
          <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
        </button>
      </div>
      <div class="swap-off">
        <div>
          <h2 class="mt-2">Question</h2>
          <div bind:offsetHeight={height}>
            Solve the following inequality
            {#key variables}
            <div in:scale>
              {@html qn}
            </div>
            {/key}
          </div>
          <button 
            class="btn btn-secondary"
            on:click={() => {variables = getNewVars();}}
          >
            Generate new question
            <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
          </button>
          <h2>Answer</h2>
          {#key variables}
          <div in:scale>
            {@html ans}
          </div>
          {/key}
          <h2>Solution</h2>
          {#key variables}
          <div in:scale>
            {@html soln}
          </div>
          {/key}
          <button 
            class="btn btn-secondary"
            on:click={() => {variables = getNewVars(); window.scroll({top: 0});}}
          >
            Generate new question
            <img src="/icons/edit.svg" class="h-6 w-6 my-0" alt="practice"/>
          </button>
        </div>
      </div>
    </label>
  </div>
  <h2>Extensions</h2>
  <h3>What if our quadratic is not factorisable?</h3>
  <p>
    Maybe the quadratic still has roots, but they happen to be irrational so
    we are unable to obtain nice factors.
  </p>
  <p>
    In that case we can use our quadratic formula {@html math(`x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`)}
    to find the roots and resume with our number line approach.
  </p>
  <h2>Next technique</h2>
  <p>
    The next technique will tackle the case if our quadratic
    is not factorizable because it has no real roots
  </p>
  <a class="btn btn-primary" href="./02-positive">
    Positive Quadratics
    <img src="/icons/next-white.svg" class="h-6 w-6 my-0 text-white" alt="next"/>
  </a>
</main>


<style>
  main {
    padding: 0.5rem;
    margin-inline: auto;
    font-size: 21px;
  }
  button.tab {
    position: relative;
  }
  .highlight {
    content: "";
    position: absolute;
    left: 20%;
    bottom: 7px;
    width: 60%;
    height: 10px;
    transform: skew(-30deg);
    background: rgba(254,219,134,0.6);
    transition: all 1s;
  }
  .swap-on, .swap-off {
    padding: 0.5rem;
    border-width: 0 0 0 var(--tab-border, 1px);
    border-left-color: hsl(var(--b3) / var(--tw-bg-opacity, 1));;
  }
</style>