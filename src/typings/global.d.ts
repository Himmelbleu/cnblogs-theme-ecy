/**
 * 随笔/文章
 */
type BleuArbeiten = Partial<{
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
type BleuComment = Partial<{
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
interface BleuMark {
  count: number;
  href: string;
  text: string;
}

/**
 * 随笔列表
 */
type BleuArbeitenList = Partial<{
  page: number;
  hint: string;
  data: BleuArbeiten[];
}>;

/**
 * 随笔列表，用于分类或标签区分的随笔列表
 */
interface BleuArbeitenList2 extends BleuArbeitenList {
  desc?: string;
  // 子分类描述
  desc2?: string;
  isArticle?: boolean;
}

/**
 * 随笔的分类和标签数组
 */
interface BleuArbeitenProps {
  tags: { text: string }[];
  sorts: { href: string; text: string }[];
}

/**
 * 二级分类
 */
interface BleuArbeitenL2 {
  id: string;
  text: string;
}

/**
 * 侧边栏标签和分类数组
 */
interface BleuMenuColumn {
  essaySort: { id: string; text: string; count: string }[];
  essayArchive: { id: string; text: string; count: string }[];
  articleSort: { id: string; text: string; count: string }[];
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
type BleuMenuItemData = Partial<{
  id: string;
  // 文本描述
  text: string;
  digg: string;
  href: string;
}>;

/**
 * 侧边栏阅读排行榜
 */
interface BleuTopList {
  topView: BleuMenuItemData[];
  topComments: BleuMenuItemData[];
  topDigg: BleuMenuItemData[];
}

/**
 * 上一篇或下一篇随笔
 */
interface BleuArbeitenPrevNext {
  prev: IMenuItemData;
  next: IMenuItemData;
}

interface BleuAlbumnItem {
  id: string;
  src: string;
}

/**
 * 博客配置项
 */
type BleuConfig = Partial<{
  icon: string;
  avatar: string;
  signature: string;
  images: {
    bg: {
      src: string;
      opacity: number;
      size: string;
      repeat: string;
    };
    arbeiten?: string[];
    home: {
      opacity: number;
      interval: number;
      carousel: string[];
      divider: string;
    };
  };
  chart: any;
  font: {
    main: string;
    code: string;
    art: string;
  };
}>;

/**
 * Bleu 本地设置
 */
type BleuOptions = Partial<{
  theme: { mode: "dark" | "light" };
  toolkits: { pin: boolean };
}>;

/**
 * Bleu 配置选项
 */
declare namespace BleuVars {
  let config: BleuConfig;

  function getBlogApp(): string;
  function getBlogId(): number;
  function getBaseURL(): string;
  function isPcDevice(): boolean;

  function getUserGuid(): string;
  /**
   * 是否已经订阅
   */
  function isFollow(): boolean;
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
  /**
   * 设置标题
   *
   * @param title 标题内容
   */
  function setTitle(title?: string): void;
  /**
   * 移动窗口
   *
   * @param selector 选择器
   */
  function scrollIntoView(selector: string): void;
  /**
   * 关闭 loading 屏
   */
  function endLoading(): void;
  /**
   * 开启 loading 屏
   */
  function startLoading(): void;
}

declare namespace Formatter {
  /**
   * 把一串数字转换为“xx万”的形式
   *
   * @param num 被格式化的数字
   */
  function unit(num: string): string;
}

declare namespace Native {
  /**
   * 打开博客园上传图片的 API，上传完成之后，图片路径要回显到 textarea 上。
   *
   * @param el 图片上传成功之后返回的链接赋值给 textarea 元素。
   * @param onUploaded 选择符合规则的本地图片之后，小窗关闭返回一个图片连接到 el textarea 元素中，获取 focus 得到图片链接该回调函数可向上传递该链接。
   */
  function openImageUploadWindow(el: string, onUploaded: (img: string) => void): void;
}

declare namespace Navigation {
  /**
   * 封装 router 导航
   *
   * @param params 路径以及是否通过 vue-router 进行导航
   */
  function go(params: { path: string; router?: Router }): void;
}

declare namespace PrettifyLog {
  function primary(title: string, msg: string): void;
  function warning(title: string, msg: string): void;
}

declare namespace BleuStorage {
  /**
   * 获取本地存储中的设置
   */
  function getOptions(): RemovableRef<BleuOptions>;
  /**
   * 获取本地存储中的模板
   */
  function getOptionsTemp(): BleuOptions;
  /**
   * 对一个对象的字段进行裁剪或添加
   *
   * @param source 要被裁剪或添加字段的对象
   * @param template 一个对象，根据该模板（对象）对 source 进行裁剪或添加字段
   */
  function refactor(source: any, template: any): any;
}

declare namespace Random {
  /**
   * 获取不重复的数组的索引数组
   *
   * @param src 源数组
   * @param max 最大数值
   * @returns 一个不重复的 src 的索引
   */
  function get(src: string[], max: number): number[];
}

declare namespace Textual {
  /**
   * 匹配一串字符，得到其匹配的结果，再进行字符串切割
   *
   * @param str 源字符串
   * @param regex 从字符串中匹配想要的再进行切割
   * @param keys 对每一次 match 得到的子串进行索引，即取值
   * @param values 每一次 match 得到的子串
   * @returns 从 str 经过多次 split 得到的子串
   */
  function regexSplit(str: string, regex: RegExp, keys: number[], values: string[]): string;
  /**
   * 替换字符串，默认替换 ""。传递 regExps，一个正则表达式数组。
   *
   * @param str 被修剪的字符串
   * @param regexs 正则表达式，找到匹配的字符串，然后替换掉
   * @param replacement 不传递，默认被替换的字符串是 ""。传递的数组等于 regExps 的长度，就一一对应进行替换。如果传递的
   * 数组小于 regExps，就与前几个进行对应替换，其余的用默认 "" 替换。
   */
  function regexReplace(str: string, regexs: RegExp[], replacement?: string[]): string;
}
