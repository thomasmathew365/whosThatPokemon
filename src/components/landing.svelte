<script>
  import Next from "./nextButton.svelte";
  import { navigate } from "svelte-routing";
</script>

<div class="landing-bg" />
<div class="landing-title-cont">
  <div class="landing-title">Who's That Pokemon ?</div>
</div>
<div class="button-cont">
  <Next title="START" onClick={() => navigate("/main", {replace: true})} />
</div>

<style>
  @font-face {
    font-family: pokemon-font;
    src: url("../fonts/PokemonSolid.ttf") format("truetype");
  }

  .landing-title-cont {
    margin-top: 20vh;
  }

  .landing-bg {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

  @keyframes gradient {
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

  .landing-title {
    font-family: pokemon-font;
    font-size: 4em;
    color: #ffcb05;
    text-shadow: -10px 0 #3c5aa6, 0 10px #3c5aa6, 1px 0 #3c5aa6, 0 -1px #3c5aa6;
    text-align: center;
  }

  .button-cont {
    margin-top: 50px;
  }
</style>
