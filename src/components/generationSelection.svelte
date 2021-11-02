<script>
  import RangeSlider from "svelte-range-slider-pips";
  export let isVisible, sliderValue, onSliderChange;
</script>

<div>button</div>
{#if isVisible}
  <RangeSlider on:change={onSliderChange} id="generation-range" values={sliderValue} pips min={0} max={8} float range/>
{/if}


<style>


</style>

