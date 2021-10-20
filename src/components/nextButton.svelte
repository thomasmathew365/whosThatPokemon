<script>
  export let onClick;
  export let title;
</script>

<div class="wrapper">
  <div class="cta" on:click={onClick}>
    <span>{title}</span>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css?family=Poppins:900i");
  .wrapper {
    display: flex;
    justify-content: center;
  }

  .cta {
    display: flex;
    padding: 10px 45px;
    text-decoration: none;
    font-family: "Poppins", sans-serif;
    font-size: 40px;
    color: #3c5aa6;
    background: #ffde00;
    transition: 1s;
    box-shadow: 6px 6px 0 #3c5aa6;
    transform: skewX(-15deg);
    transition: all 0.3s ease-in-out;
  }

  .cta:focus {
    outline: none;
  }

  .cta:hover {
    box-shadow: 6px 6px 0 #3b4cca;
  }
</style>
