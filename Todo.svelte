<script>
  import { push } from "svelte-spa-router";
  import { operationStore, query, mutation } from "@urql/svelte";
  import { TODO_QUERY, UPDATE_TODO } from "./gql";

  export let params;

  const updateMutation = mutation({ query: UPDATE_TODO });

  function updateTodo(id) {
    updateMutation({ id });
    push("#/todos");
  }

  const todo = operationStore(
    TODO_QUERY,
    { id: params.id },
    { requestPolicy: "cache-and-network" }
  );

  query(todo);

  console.log("todo:", todo);
</script>

<h3>Todo detail view</h3>
<br>

{#if !$todo.data}
  Loading todo...
{:else if $todo.error}
  Oh no! {$todo.error.message}
{:else}
  <b>Fetching</b>: {$todo.fetching}<br><br>
  <b>Stale</b>: {$todo.stale}<br><br>
  <b>ID</b>: {$todo.data.todo.id}<br><br>
  <b>Text</b>: {$todo.data.todo.text}<br><br>
  <b>Complete</b>: {$todo.data.todo.complete}<br><br>
  <button on:click={() => updateTodo($todo.data.todo.id)}>Toggle complete, now is {$todo.data.todo.complete}</button>
{/if}

<hr>

<b>$todo</b>: {JSON.stringify($todo,null,2)}
<br><br>
<b>todo</b>: {JSON.stringify(todo,null,2)}