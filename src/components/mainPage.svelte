<script lang="ts">
  import { onMount } from "svelte";
  import {
    initialList,
    getLStorage,
    setLStorage,
    getOptionList,
  } from "../utils/common";
  import Options from "./options.svelte";
  import CenterView from "./centerView.svelte";
  import GenerationSlider from "./generationSelection.svelte";
  import Next from "./nextButton.svelte";
  import { fly, fade } from "svelte/transition";
  import confetti from "canvas-confetti";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import ProgressBar from "./progressBar.svelte";
  import Image from "svelte-image";
  import { generationByID } from "../utils/constants";

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
  let score = 0;
  let count = 10;
  function countdownTimer() {
    if (count > 0) {
      count -= 0.1;
      progress.set(count / 10);
    }
  }
  let scoreCountdown;
  let failed = false;
  let showCountdown = false;
  let sliderValue = [0, 1];

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
      }
    }, 1000);
  });

  function onImageLoaded() {
    scoreCountdown = setInterval(countdownTimer, 100);
    showCountdown = true;
  }

  function onCorrectChoice() {
    isCorrect = true;
    score = score + 10 * (Math.ceil(count) ? Math.ceil(count) : 1);
    showCountdown = false;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
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
  {console.log(
    generationByID[sliderValue[0]].min,
    generationByID[sliderValue[1]].max
  )}
  <div class="bg" />
  <div class="bg bg2" />
  <div class="bg bg3" />
  {#if !failed}
    <div>
      <h1>Score: {score}</h1>
      <GenerationSlider
        isVisible={true}
        {sliderValue}
        onSliderChange={(e) => {
          sliderValue = e.detail.values;
        }}
      />
      <CenterView {list} {currentViewed} {isCorrect} {onImageLoaded} />

      <Options
        optionsList={list[currentViewed].options}
        optionClick={!isCorrect ? onOptionClick : null}
      />
      <ProgressBar {showCountdown} {progress} />
      {#if isCorrect}
        <div
          in:fly={{ x: -200, duration: 1000, delay: 500 }}
          out:fly={{ x: 200, duration: 500 }}
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
        <Image src="../images/pikachu-fail.png" />
      </div>
    </div>
  {/if}
</div>

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
    /* background-image: url("../images/pikachu-fail.png"); */
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
</style>
