/**
 * 导航
 *
 * @author Himmelbleu
 * @date 2023 年 1 月 15 日
 */
export namespace Navigation {
  /**
   * 封装 router 导航
   *
   * @param params 路径以及是否通过 vue-router 进行导航
   */
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
