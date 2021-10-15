<script>
  export let optionsList;
  export let optionClick;
</script>

<div class="options-container">
  {#each optionsList as option}
    <div
      class="option-item"
      on:click={() => {
        optionClick(option);
      }}
    >
      {option}
    </div>
  {/each}
</div>

<style>
  .options-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px 10px;
  }

  .option-item {
    color: #eeeeee;
    padding: 10px;
    background: #c04c4b;
    outline: 2px solid #eee;
  }

  .option-item:hover {
    background: linear-gradient(270deg, #c04c4b, #333333);
    background-size: 400% 400%;

    -webkit-animation: AnimationName 0.2s ease infinite;
    -moz-animation: AnimationName 2s ease infinite;
    animation: AnimationName 2s ease infinite;
  }

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
