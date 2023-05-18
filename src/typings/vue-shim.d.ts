export {};

declare module "vue" {
  interface ComponentCustomProperties {
    /**
     * 是否已登录
     */
    isLogined: boolean;
    /**
     * 是否为博主
     */
    isBlogOwner: boolean;
  }
}
