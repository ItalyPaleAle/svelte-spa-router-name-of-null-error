export const TODO_FRAG = `
  fragment TODO_FRAG on Todo {
    id
    text
    complete
    createdAt
  }
`;

export const TODO_QUERY = `
  query ($id: ID!) {
    todo(id: $id) {
      ...TODO_FRAG
    }
  }
  ${TODO_FRAG}
`;

export const TODOS_QUERY = `
  query ($input: Pagination!) {
    todos(input: $input) {
      ...TODO_FRAG
    }
  }
  ${TODO_FRAG}
`;

export const ADD_TODO = `
  mutation ($text: String!) {
    addTodo(text: $text) {
      ...TODO_FRAG
    }
  }
  ${TODO_FRAG}
`;

export const ADD_TODOS = `
  mutation {
    addTodos {
      ...TODO_FRAG
    }
  }
  ${TODO_FRAG}
`;

export const UPDATE_TODO = `
  mutation ($id: ID!) {
    updateTodo(id: $id) {
      ...TODO_FRAG
    }
  }
  ${TODO_FRAG}
`;

export const DELETE_TODO = `
  mutation ($id: ID!) {
    deleteTodo(id: $id)
  }
`;
