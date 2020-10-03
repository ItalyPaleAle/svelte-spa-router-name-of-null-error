<script>
  import { routes } from "./routes";
  import urql from "./urql";
  import Router from "svelte-spa-router";
  import Navbar from "./Navbar.svelte";

  urql.OnInit();
</script>

<style>
  :global(body) {
    padding: 20px;
  }
</style>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

<div class="container">
  
  <Navbar/>

  <Router {routes}/>

</div>