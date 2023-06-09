/**
 * Vue Router 工具，解析 url，跳转对应的 router
 *
 * @author Himmelbleu
 * @date 2022 年 12 月 1 日
 */
import { useAnchorStore } from "@/store";
import type { RouteRecordRaw, NavigationGuardNext } from "vue-router";

export const routes = <RouteRecordRaw[]>[
  {
    name: RouterName.BleuHome,
    path: RouterPath.BleuHome(),
    component: () => import("@/views/BleuHome.vue"),
    meta: { title: "首页" }
  },
  {
    name: RouterName.Arbeiten,
    path: RouterPath.Arbeiten(),
    component: () => import("@/views/Arbeiten.vue")
  },
  {
    name: RouterName.ArbeitenList,
    path: RouterPath.ArbeitenList(),
    props: true,
    component: () => import("@/views/ArbeitenList.vue")
  },
  {
    name: RouterName.ArbeitenByMark,
    path: RouterPath.ArbeitenByMark(),
    props: true,
    component: () => import("@/views/ArbeitenByMark.vue")
  },
  {
    name: RouterName.ArbeitenBySort,
    path: RouterPath.ArbeitenBySort(),
    props: true,
    component: () => import("@/views/ArbeitenBySort.vue")
  },
  {
    name: RouterName.ArbeitenByArchive,
    path: RouterPath.ArbeitenByArchive(),
    component: () => import("@/views/ArbeitenByArchive.vue")
  },
  {
    name: RouterName.ArbeitenByCalendar,
    path: RouterPath.ArbeitenByCalendar(),
    component: () => import("@/views/ArbeitenByCalendar.vue"),
    meta: { title: "博客日历" }
  },
  {
    name: RouterName.MarkList,
    path: RouterPath.MarkList(),
    component: () => import("@/views/MarkList.vue"),
    meta: { title: "标签集合" }
  },
  {
    name: RouterName.Albumn,
    path: RouterPath.Albumn(),
    component: () => import("@/views/Albumn.vue"),
    meta: { title: "相册" }
  },
  {
    name: RouterName.AlbumnItem,
    path: RouterPath.AlbumnItem(),
    component: () => import("@/views/AlbumnItem.vue"),
    meta: { title: "相册图片" }
  }
];

function positionToComment() {
  const result = /#\/\d+/g.exec(window.location.href);
  if (result !== null) {
    const anchor = result[0].split("#/")[1];
    useAnchorStore().setAnchor(anchor);
  }
}

/**
 * 针对于博客园的路由匹配规则
 */
const routeRules = [
  {
    regex: RouterRegx.Arbeiten,
    name: RouterName.Arbeiten,
    params: {
      id: Textual.regexSplit(window.location.href, RouterRegx.Arbeiten, [2, 0], ["/", "."])
    },
    before: positionToComment
  },
  {
    regex: RouterRegx.ArbeitenBySort,
    name: RouterName.ArbeitenBySort,
    params: {
      id: Textual.regexSplit(window.location.href, RouterRegx.ArbeitenBySort, [2, 0], ["/", "."])
    }
  },
  {
    regex: RouterRegx.ArbeitenByMark,
    name: RouterName.ArbeitenByMark,
    params: {
      tag: Textual.regexSplit(
        decodeURI(window.location.href),
        RouterRegx.ArbeitenByMark,
        [2],
        ["/"]
      )
    }
  },
  {
    regex: RouterRegx.AlbumnItem,
    name: RouterName.AlbumnItem,
    params: { id: Textual.regexSplit(window.location.href, RouterRegx.AlbumnItem, [3], ["/"]) }
  },
  {
    regex: RouterRegx.Articles,
    name: RouterName.Arbeiten,
    params: {
      id: Textual.regexSplit(window.location.href, RouterRegx.Articles, [2, 0], ["/", "."])
    }
  }
];

/**
 * 对原博客链接进行重写并提取重要信息。
 */
export function redirect(next: NavigationGuardNext) {
  const matched = routeRules.find(rule => rule.regex.test(window.location.href));

  if (matched) {
    if (matched.before) matched.before();
    window.history.pushState(
      "",
      "",
      `${window.location.protocol}//${window.location.host}/${BleuVars.getBlogApp()}/#/`
    );
    next({
      name: matched.name,
      params: matched.params
    });
  } else next();
}
