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
