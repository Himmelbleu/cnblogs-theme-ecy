export namespace Navigation {
  export function go(params: { path: string; router?: Router }) {
    if (params.path === "back") {
      params.router.go(-1);
    } else {
      if (params.router) params.router.push(params.path);
      else {
        window.open(params.path);
      }
    }
  }
}
