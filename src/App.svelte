<script lang="ts">
  import MainPage from "./components/mainPage.svelte";
  import Landing from "./components/landing.svelte";
  import { Router, Link, Route } from "svelte-routing";

  export let url = "";


  function handleKeydown(e) {
    e.preventDefault();
  // Stash the event so it can be triggered later.
  let deferredPrompt = e;

  console.log(`'beforeinstallprompt' event was fired.`);
  }

</script>


<svelte:window on:beforeinstallprompt={handleKeydown}/>

<Router {url}>
    <Route path="/"><Landing /></Route>
    <main>
      <Route path="/main"><MainPage /></Route>
    </main>
</Router>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
