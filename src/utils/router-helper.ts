/**
 * Vue Router 工具，解析 url，跳转对应的 router
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 */

import { useAnchorStore } from "@/store";

export const routes = [
  {
    name: RouterName.INDEX,
    path: RouterPath.INDEX(),
    component: () => import("@/views/Index.vue")
  },
  {
    name: RouterName.PROFILE,
    path: RouterPath.PROFILE(),
    component: () => import("@/views/Profile.vue")
  },
  {
    name: RouterName.WORKS,
    path: RouterPath.WORKS(),
    component: () => import("@/views/Works.vue")
  },
  {
    name: RouterName.WORKS_BY_MARK,
    path: RouterPath.WORKS_BY_MARK(),
    component: () => import("@/views/WorksByMark.vue")
  },
  {
    name: RouterName.WORKS_BY_SORT,
    path: RouterPath.WORKS_BY_SORT(),
    component: () => import("@/views/WorksBySort.vue")
  },
  {
    name: RouterName.WORKS_BY_ARCHIVE,
    path: RouterPath.WORKS_BY_ARCHIVE(),
    component: () => import("@/views/WorksByArchive.vue")
  },
  {
    name: RouterName.WORKS_BY_CALENDAR,
    path: RouterPath.WORKS_BY_CALENDAR(),
    component: () => import("@/views/WorksByCalendar.vue")
  },
  {
    name: RouterName.MARK_LIST,
    path: RouterPath.MARK_LIST(),
    component: () => import("@/views/MarkList.vue")
  },
  {
    name: RouterName.ALBUMN,
    path: RouterPath.ALBUMN(),
    component: () => import("@/views/Albumn.vue")
  },
  {
    name: RouterName.ALBUMN_ITEM,
    path: RouterPath.ALBUMN_ITEM(),
    component: () => import("@/views/AlbumnItem.vue")
  }
];

/**
 * 从评论链接点击进入时，获取其携带的评论锚点位置
 */
function addCommentAnchor(URL: string) {
  const regex = /#\/\d+/g;
  const result = regex.exec(URL);
  if (result !== null) {
    const anchor = result[0].split("#/")[1];
    useAnchorStore().setAnchor(anchor);
  }
}

function push() {
  window.history.pushState("", "", `${window.location.protocol}//${window.location.host}/${EcyConfig.blogApp}/#/`);
}

function split(str: string, regex: RegExp, keys: number[], values: string[]) {
  let matched;
  if (keys.length !== values.length) return "";
  if (str.match(regex)) {
    matched = str.match(regex)[0];
    for (let i = 0; i < keys.length; i++) {
      matched = matched.split(values[i])[keys[i]];
    }
  }
  return matched;
}

/**
 * 对原博客链接进行重写并提取重要信息。
 *
 * 比如文章页，地址是 https://www.cnblogs.com/Himmelbleu/p/11111.html。Vue Router 要的不是这样的 URL，而是 hash URL，
 * 提取该 URL 中重要信息，如随笔的 ID：11111，得到之后创建 guardNext，让 next 函数导入对应的路由组件。
 *
 * 如果进入的就是路由组件的 URL，则不需要进行上诉操作。
 *
 * @param next NavigationGuardNext
 */
export function redirect(next: NavigationGuardNext) {
  const URL = window.location.href;
  const routerList = [
    {
      regex: RouterRegx.WORKS,
      name: RouterName.WORKS,
      params: { id: split(URL, RouterRegx.WORKS, [2, 0], ["/", "."]) },
      before: addCommentAnchor
    },
    {
      regex: RouterRegx.WORKS_BY_SORT,
      name: RouterName.WORKS_BY_SORT,
      params: { id: split(URL, RouterRegx.WORKS_BY_SORT, [2, 0], ["/", "."]) }
    },
    {
      regex: RouterRegx.WORKS_BY_MARK,
      name: RouterName.WORKS_BY_MARK,
      params: { tag: split(decodeURI(URL), RouterRegx.WORKS_BY_MARK, [2], ["/"]) }
    },
    {
      regex: RouterRegx.ALBUMN_ITEM,
      name: RouterName.ALBUMN_ITEM,
      params: { id: split(URL, RouterRegx.ALBUMN_ITEM, [3], ["/"]) }
    },
    {
      regex: RouterRegx.ARTICLES,
      name: RouterName.WORKS,
      params: { id: split(URL, RouterRegx.ARTICLES, [2, 0], ["/", "."]) }
    }
  ];

  const matchedRouter = routerList.find(router => {
    const result = router.regex.test(URL);
    return result;
  });

  if (matchedRouter) {
    matchedRouter.before && matchedRouter.before(URL);
    push();
    next({
      name: matchedRouter.name,
      params: matchedRouter.params
    });
  } else next();
}
