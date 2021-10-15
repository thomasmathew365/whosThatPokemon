<script>
  import { fade } from "svelte/transition";

  export let list, currentViewed, isCorrect;
</script>

<div class="center-container">
  <div class="image-container">
   
    {#each list as listItem, i}
      {#if currentViewed === i}
        <img
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
    /* background-color: black; */
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
