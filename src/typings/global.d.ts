/**
 * 随笔/文章
 */
type EcyWorks = Partial<{
  id: string;
  // 随笔标题
  text: string;
  content: string;
  desc: string;
  date: string;
  view: string;
  comm: string;
  digg: string;
  surface: string;
  // 文章是否被密码锁定
  isLocked: boolean;
  // 是否仅限于自己可见
  isOnlyMe: boolean;
  // 是否置顶
  isTop: boolean;
}>;

/**
 * 评论
 */
type EcyComment = Partial<{
  // 是否正在编辑
  isEditing: boolean;
  // 是否正在回复
  isAnsling: boolean;
  // 评论 ID
  commentId: string;
  // 个人主页地址
  space: string;
  // 楼层
  layer: string;
  date: string;
  author: string;
  digg: string;
  bury: string;
  avatar: string;
  postId: string;
  content: string;
  // 回复评论 ID
  parentCommentId: number;
  // 当前评论所在评论列表的页数
  pageIndex: number;
}>;

/**
 * 标签
 */
interface EcyMark {
  count: number;
  href: string;
  text: string;
}

/**
 * 随笔列表
 */
type EcyWorksList = Partial<{
  page: number;
  hint: string;
  data: EcyWorks[];
}>;

/**
 * 随笔列表，用于分类或标签区分的随笔列表
 */
interface EcyWorksList2 extends EcyWorksList {
  desc?: string;
  // 子分类描述
  desc2?: string;
  isArticle?: boolean;
}

/**
 * 随笔的分类和标签数组
 */
interface EcyWorksProps {
  tags: { text: string }[];
  sorts: { href: string; text: string }[];
}

/**
 * 二级分类
 */
interface EcyWorksL2 {
  id: string;
  text: string;
}

/**
 * 侧边栏标签和分类数组
 */
interface EcyMenuColumn {
  essaySort: { id: string; text: string }[];
  essayArchive: { id: string; text: string }[];
  articleSort: { id: string; text: string }[];
  articleArchive: { id: string; text: string }[];
  latestEssayList: { id: string; text: string }[];
  latestComments: { id: string; title: string; content: string; author: string }[];
  rankings: { text: string }[];
  tagList: { id: string; text: string }[];
  albumn: { id: string; text: string }[];
}

/**
 * 第一种：
 * 随笔数量、文章数量、评论数量、阅读数量
 *
 * 第二种：
 * 粉丝、昵称、关注、园龄
 *
 * 第三种：
 * 随笔上一篇或下一篇随笔数据类型
 */
type EcyMenuItemData = Partial<{
  id: string;
  // 文本描述
  text: string;
  digg: string;
  href: string;
}>;

/**
 * 侧边栏阅读排行榜
 */
interface EcyTopList {
  topView: EcyMenuItemData[];
  topComments: EcyMenuItemData[];
  topDigg: EcyMenuItemData[];
}

/**
 * 上一篇或下一篇随笔
 */
interface EcyWorksPrevNext {
  prev: IMenuItemData;
  next: IMenuItemData;
}

interface EcyAlbumnItem {
  id: string;
  src: string;
}

/**
 * 博客配置项
 */
type EcyConfig = Partial<{
  icon: string;
  avatar: string;
  menu: Partial<{
    links: { href: string; text: string }[];
    books: { href?: string; text: string; img: string; author: string; rate: number }[];
  }>;
  covers: {
    matte: { index: number; works: number };
    filter: { index: string; works: string };
    index: string[];
    works: string[];
  };
  graph: {
    alpha: number;
    sides: number;
    layer: number;
    lineWidth: number;
    textSize: number;
    data: { title: string; star: number }[];
  };
  font: {
    main: string;
    code: string;
  };
}>;

/**
 * Ecy 主题设置数据类型
 */
type EcyLocalSetting = Partial<{
  theme: { mode: "dark" | "light" };
  toolkits: { pin: boolean };
  menu: {
    toggles: Record<string, { arrowDown: boolean; intake: boolean }>;
  };
}>;

/**
 * Ecy 配置
 */
declare namespace EcyVars {
  let config: EcyConfig;
  let userGuid: string;
  let isFollow: boolean;
  let pcDevice: boolean;

  function getBlogApp(): string;
  function getBlogId(): number;
  function getBaseURL(): string;
  function useLite(dev: Function, pro: Function);
}

/**
 * 是否已登录
 */
declare const isLogined: boolean;

/**
 * 是否为博主
 */
declare const isBlogOwner: boolean;

/**
 * 博客 ID
 */
declare const currentBlogId: number;

/**
 * 博客域名
 */
declare const currentBlogApp: string;

declare namespace Broswer {
  function setTitle(title?: string): void;
  function scrollIntoView(selector: string): void;
  function endLoading(): void;
  function startLoading(): void;
}

declare namespace Formatter {
  function unit(num: string): string;
}

declare namespace Native {
  function openImageUploadWindow(el: string, onUploaded: (img: string) => void): void;
}

declare namespace Navigation {
  function go(params: { path: string; router?: Router }): void;
}

declare namespace PrettifyLog {
  function primary(title: string, msg: string): void;
  function warning(title: string, msg: string): void;
}

declare namespace LocalStorage {
  function getSetting(): RemovableRef<EcyLocalSetting>;
  function getSettingTemp(): EcyLocalSetting;
  function reloadObjProps(source: any, template: any): any;
}

declare namespace Random {
  function get(src: string[], max: number): number[];
}

declare namespace Textual {
  function split(str: string, regex: RegExp, keys: number[], values: string[]): string;
  function replace(source: string, regExps: RegExp[], replacement?: string[]): string;
}
