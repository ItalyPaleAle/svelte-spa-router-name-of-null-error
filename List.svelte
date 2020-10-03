<script>
  import { push } from "svelte-spa-router";
  import { operationStore, query, mutation } from "@urql/svelte";
  import { TODOS_QUERY, ADD_TODOS, UPDATE_TODO, DELETE_TODO } from "./gql";

  let manualReload = true;

  const todos = operationStore(
    TODOS_QUERY,
    { input: { first: 100 } },
    { requestPolicy: "cache-and-network" }
  );

  const addMutation = mutation({ query: ADD_TODOS });
  const updateMutation = mutation({ query: UPDATE_TODO });
  const deleteMutation = mutation({ query: DELETE_TODO });

  query(todos);

  function addTodos() {
    addMutation();
  }

  function updateTodo(id) {
    updateMutation({ id });
  }

  function deleteTodo(id) {
    deleteMutation({ id });
  }
</script>

<button class="btn btn-sm btn-secondary" on:click={addTodos}>Add more random todos</button>
<span class="ml-5">fetching: <b>{$todos.fetching}</b></span>
<span class="ml-5">stale: <b>{$todos.stale}</b></span>
<br><br>

{#if !$todos || $todos.fetching || !$todos.data}
  Loading todos...
{:else if $todos.error}
  Oh no! {$todos.error.message}
{:else}
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">ID</th>
        <th scope="col">Text</th>
        <th scope="col">Completed</th>
      </tr>
    </thead>
    <tbody>
      {#each $todos.data.todos as todo (todo.id)}
        <tr class={(todo.id.startsWith("TEMP_ID_") && "bg-success") || (todo.text === "UPDATING" && "bg-info") || (todo.text === "DELETING" && "bg-danger")}>
        <th scope="row"><button on:click={() => deleteTodo(todo.id)}>Delete</button></th>
        <td>{todo.id}</td>
        <td>{todo.text} - <a href={`#/todos/${todo.id}`}>Open</a> - <a href={`#/todos/${todo.id}/edit`}>Edit</a></td>
        <td><button on:click={() => updateTodo(todo.id)}>{todo.complete}</button></td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
