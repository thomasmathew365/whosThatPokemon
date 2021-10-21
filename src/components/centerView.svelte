<script>
  import { fade } from "svelte/transition";

  export let list, currentViewed, isCorrect, onImageLoaded;
</script>

<div class="center-container">
  <div class="image-container">
    {#each list as listItem, i}
      {#if currentViewed === i}
        <img
          on:load={onImageLoaded}
          in:fade={{ duration: 400 }}
          out:fade={{ duration: 200 }}
          src={listItem.image}
          alt=""
          class={`pokemon-image ${!isCorrect ? `hidden` : `visible`}`}
        />
      {/if}
    {/each}
  </div>
</div>

<style>
  .image-container {
    min-height: 40vh;
  }
  .pokemon-image {
    height: 40vh;
  }
  .hidden {
    filter: brightness(0);
  }
  .visible {
    filter: drop-shadow(10px 10px #333);
  }
</style>
