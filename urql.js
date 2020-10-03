import gql from "graphql-tag";
import { initClient, dedupExchange, fetchExchange } from "@urql/svelte";
import { offlineExchange } from "@urql/exchange-graphcache";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";
import { TODOS_QUERY, TODO_FRAG } from "./gql";

const updates = {
  Mutation: {
    addTodo: (result, args, cache, info) => {
      const allFields = cache.inspectFields("Query");
      const todoQueries = allFields.filter(x => x.fieldName === "todos");
      todoQueries.forEach(x => {
        cache.updateQuery(
          { query: TODOS_QUERY, variables: x.arguments },
          data => {
            return {
              ...data,
              todos: [...data.todos, result.addTodo]
            };
          }
        );
      });
    },
    deleteTodo: (result, args, cache, info) => {
      if (result.deleteTodo) {
        cache.invalidate({ __typename: "Todo", id: args.id });
      }
    }
  }
};

const optimistic = {
  addTodo: (variables, cache, info) => {
    return {
      ...variables,
      __typename: "Todo",
      id: "TEMP_ID_" + Date.now(),
      complete: false,
      createdAt: Date.now()
    };
  },
  updateTodo: (args, cache) => {
    const actualTodo = cache.readFragment(
      gql`
        ${TODO_FRAG}
      `,
      { id: args.id }
    );
    return { ...actualTodo, ...args, text: "UPDATING" };
  },
  deleteTodo: (args, cache) => {
    const actualTodo = cache.readFragment(
      gql`
        ${TODO_FRAG}
      `,
      { id: args.id }
    );
    const todo = { ...actualTodo, text: "DELETING" };
    cache.writeFragment(
      gql`
        ${TODO_FRAG}
      `,
      todo
    );
  }
};

const storage = makeDefaultStorage({
  idbName: "graphcache-v3",
  maxAge: 7
});

const exchanges = [
  dedupExchange,
  offlineExchange({ storage, updates, optimistic }),
  fetchExchange
];

function OnInit() {
  initClient({ url: "https://h1pcl.sse.codesandbox.io", exchanges });
}

export default {
  OnInit
};
