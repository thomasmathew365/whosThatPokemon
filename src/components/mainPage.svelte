<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    initialList,
    getLStorage,
    setLStorage,
    getOptionList,
  } from "../utils/common";
  import Options from "./options.svelte";
  import CenterView from "./centerView.svelte";
  import Next from "./nextButton.svelte";
  import { fly, fade } from "svelte/transition";
  import confetti from "canvas-confetti";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  let currentViewed = 0;
  let currentLoaded = getLStorage("currentLoaded")
    ? JSON.parse(getLStorage("currentLoaded"))
    : -1;
  let list = initialList();
  let isCorrect = false;
  //   let score = 0;
  // $: score = currentViewed * 10;
  let score = 0;
  let count = 10;
  function countdownTimer() {
    if (count > 0) {
      count -= 0.1;
      progress.set(count / 10);
    }
  }
  // let scoreCountdown = setInterval(countdownTimer, 100);
  let scoreCountdown;
  let failed = false;


  onMount(() => {
    setInterval(async () => {
      if (currentLoaded - currentViewed < 5) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${list[currentLoaded + 1].id}`
        );
        const parsedVal = await response.json();
        list[currentLoaded + 1].name = parsedVal.name;
        list[currentLoaded + 1].options = getOptionList(parsedVal.name);
        list[currentLoaded + 1].loaded = true;
        list[currentLoaded + 1].image =
          parsedVal?.sprites?.other["official-artwork"].front_default;
        currentLoaded += 1;
        
        // setLStorage('list', JSON.stringify(list));
        // setLStorage('currentLoaded', currentLoaded);
      }
    }, 1000);

    // setInterval(() => {
    //   if (count > 0) {
    //     count -= 0.1;
    //   }
    //   progress.set(count / 10);
    // }, 100);
  });

  function onImageLoaded() {
    scoreCountdown = setInterval(countdownTimer, 100);
  }

  function onCorrectChoice() {
    isCorrect = true;
    score = score + 10 * (Math.ceil(count) ? Math.ceil(count) : 1);
    // score = score + 10 * Math.ceil(count);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    // scoreCountdown = setInterval(countdownTimer, 100);
  }

  function onWrongChoice() {
    failed = true;
    clearInterval(scoreCountdown);
  }

  function onOptionClick(selectedOption) {
    list[currentViewed].name === selectedOption
      ? onCorrectChoice()
      : onWrongChoice();
  }
</script>

<div>
  <div class="bg" />
  <div class="bg bg2" />
  <div class="bg bg3" />
  {#if !failed}
    <div>
      <h1>Score: {score}</h1>
      <CenterView {list} {currentViewed} {isCorrect} {onImageLoaded}/>

      <Options
        optionsList={list[currentViewed].options}
        optionClick={!isCorrect ? onOptionClick : null}
      />
      <!-- ({console.log((600 / 100) * Math.ceil($progress * 100))}) -->
      <!-- <progress value={$progress} /> -->
      <div id="center">
        <div
          id="main"
          style={`width: ${(300 / 100) * Math.ceil($progress * 100)}px`}
        />
        <div
          class="row"
          id="r-one"
          style={`width: ${300 - (300 / 100) * Math.ceil($progress * 100)}px`}
        >
          <span class="sq" id="sq-1" />
          <span class="sq" id="sq-2" />
          <span class="sq" id="sq-3" />
        </div>
        <div
          class="row"
          id="r-two"
          style={`width: ${300 - (300 / 100) * Math.ceil($progress * 100)}px`}
        >
          <span class="sq" id="sq-4" />
          <span class="sq" id="sq-5" />
          <span class="sq" id="sq-6" />
        </div>
        <div
          class="row"
          id="r-three"
          style={`width: ${300 - (300 / 100) * Math.ceil($progress * 100)}px`}
        >
          <span class="sq" id="sq-7" />
          <span class="sq" id="sq-8" />
          <span class="sq" id="sq-9" />
        </div>
        <div
          class="row"
          id="r-four"
          style={`width: ${300 - (300 / 100) * Math.ceil($progress * 100)}px`}
        >
          <span class="sq" id="sq-10" />
          <span class="sq" id="sq-11" />
          <span class="sq" id="sq-12" />
        </div>
      </div>
      {#if isCorrect}
        <div
          in:fly={{ x: -200, duration: 1000 }}
          out:fly={{ x: 200, duration: 1000 }}
          class="next-button-container"
        >
          <Next
            onClick={() => {
              currentViewed += 1;
              count = 10;
              isCorrect = false;
              clearInterval(scoreCountdown);
            }}
            title="NEXT"
          />
        </div>
      {/if}
    </div>
  {:else}
    <div in:fade out:fade>
      <h1>You'll get 'em next time...</h1>
      <h2>Score: {score}</h2>
      <div class="fail-img">
        <div
          class="try-item"
          on:click={() => {
            list = initialList();
            currentLoaded = -1;
            setLStorage("currentLoaded", -1);
            currentViewed = 0;
            score = 0;
            failed = false;
            count = 10;
            scoreCountdown = setInterval(countdownTimer, 100);
          }}
        >
          Try Again?
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- <GoogleAuth clientId="your-google-auth-client-id" on:auth-success={e => console.dir(e.detail.user)} />
  <FacebookAuth appId="your-facebook-app-id" on:auth-success={e => console.dir(e.detail.user)} /> -->
<style>
  h1 {
    color: #eeeeee;
  }
  .next-button-container {
    margin-top: 20px;
  }

  .bg {
    animation: slide 3s ease-in-out infinite alternate;
    background-image: linear-gradient(-60deg, #cc0000 50%, #3b4cca 50%);
    bottom: 0;
    left: -50%;
    opacity: 0.5;
    position: fixed;
    right: -50%;
    top: 0;
    z-index: -1;
  }

  .bg2 {
    animation-direction: alternate-reverse;
    animation-duration: 4s;
  }

  .bg3 {
    animation-duration: 5s;
  }
  @keyframes slide {
    0% {
      transform: translateX(-25%);
    }
    100% {
      transform: translateX(25%);
    }
  }
  .fail-img {
    background-image: url("../image/pikachu-fail.png");
    height: 50vh;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .try-item {
    color: #eeeeee;
    padding: 10px;
    background: #c04c4b;
    outline: 2px solid #eee;
    display: inline-block;
  }

  .try-item:hover {
    background: linear-gradient(270deg, #c04c4b, #333333);
    background-size: 400% 400%;

    -webkit-animation: AnimationName 0.2s ease infinite;
    -moz-animation: AnimationName 2s ease infinite;
    animation: AnimationName 2s ease infinite;
  }

  #center {
    width: 300px;
    height: 40px;
    /* position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -300px;
    margin-top: -50px; */
    margin: 20px auto;
    background: rgba(0, 0, 0, 1);
    border: 2px solid rgba(255, 255, 255, 1);
    border-radius: 5px;
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.2);
    overflow: hidden;
  }

  #main {
    width: 600px;
    height: 40px;
    background: #92c81a;
    float: left;
    /* animation: stretch 5s infinite linear; */
  }

  .row {
    height: 10px;
    /* width: 00px; */
    float: left;
    display: inherit;
    /* animation: squeeze 5s infinite linear; */
  }

  .sq {
    height: 10px;
    width: 10px;
    float: left;
  }

  #sq-2 {
    background: #4a672f;
  }
  #sq-3 {
    background: #1d2019;
  }
  #sq-6 {
    background: #2c341c;
  }
  #sq-1,
  #sq-5,
  #sq-9 {
    background: #74b215;
  }
  #sq-4,
  #sq-8,
  #sq-12 {
    background: #7bc415;
  }

  #sq-7,
  #sq-10,
  #sq-11 {
    background: #92c81a;
  }

  /* @keyframes stretch {
    0% {
      width: 200px;
    }
    25% {
      width: 280px;
    }
    50% {
      width: 360px;
    }
    75% {
      width: 240px;
    }
    100% {
      width: 200px;
    }
  }
  @keyframes squeeze {
    0% {
      width: 400px;
    }
    25% {
      width: 320px;
    }
    50% {
      width: 140px;
    }
    75% {
      width: 360px;
    }
    100% {
      width: 400px;
    }
  } */
</style>
