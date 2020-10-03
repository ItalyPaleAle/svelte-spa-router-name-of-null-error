<script>
  import { push } from "svelte-spa-router";
  import { mutation } from "@urql/svelte";
  import { ADD_TODO } from "./gql";

  let text = "demo text ";

  const addMutation = mutation({ query: ADD_TODO });

  function handleSubmit() {
    addMutation({ text })
      .then()
      .catch(err => console.error(err));
    push("#/todos");
  }
</script>

<h2 class="font-weight-light">Add new todo</h2>

<br>

<form on:submit|preventDefault={handleSubmit}>
  Text: <input bind:value={text} required />

  <button type="submit">Save</button>
</form>