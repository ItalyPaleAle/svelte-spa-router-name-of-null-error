import { wrap } from "svelte-spa-router/wrap";

import RouteLoading from "./RouteLoading.svelte";
import RouteNotFound from "./RouteNotFound.svelte";

export const routes = new Map()
  .set("/", wrap({ asyncComponent: () => import("./Home.svelte") }))
  .set(
    "/todos",
    wrap({
      asyncComponent: () => import("./List.svelte"),
      // loadingComponent: RouteLoading
    })
  )
  .set(
    "/todos/:id",
    wrap({
      asyncComponent: () => import("./Todo.svelte"),
      // loadingComponent: RouteLoading
    })
  )
  .set(
    "/todos/:id/edit",
    wrap({
      asyncComponent: () => import("./Edit.svelte"),
      // loadingComponent: RouteLoading
    })
  )
  .set(
    "/new",
    wrap({
      asyncComponent: () => import("./New.svelte"),
      // loadingComponent: RouteLoading
    })
  )
  .set("*", RouteNotFound);
