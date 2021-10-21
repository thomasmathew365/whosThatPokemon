<script>
  import { fade } from "svelte/transition";

  export let showCountdown, progress;
</script>

{#if showCountdown}
  <div id="center" in:fade={{ duration: 400}} out:fade={{ duration: 400 }}>
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
{:else}
  <div class="center-fake" />
{/if}

<style>
  #center {
    width: 300px;
    height: 40px;
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
  }

  .row {
    height: 10px;
    float: left;
    display: inherit;
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
</style>
