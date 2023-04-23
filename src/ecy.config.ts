export namespace EcyConfig {
  export let __ECY_CONFIG__: CustType.IEcy;
  export let blogId = 0;
  export let baseAPI = "";
  export let blogApp = "";
  export let isLogin = true;
  export let isOwner = true;
  export let userGuid = "";
  export let isFollow = false;
  export const pcDevice = isPcDevice();

  /**
   * 判断设备是否是 PC 端
   */
  function isPcDevice() {
    return !/iPhone|iPad|iPod|Android|IEMobile/.test(navigator.userAgent);
  }

  /**
   * 初始化博客重要变量，这些变量不能通过 head script 获取，在一些元素属性上。
   */
  function getUserGuid() {
    const eleA = document.querySelector("#p_b_follow > a");
    if (eleA) {
      const attr = eleA.getAttribute("onclick");
      return attr?.split("(")[1]?.split(")")[0]?.replaceAll("'", "") ?? "";
    } else return "";
  }

  /**
   * 初始化博客重要变量，这些变量不能通过 head script 获取，在一些元素属性上。
   */
  function getIsFollow() {
    const eleText = document.querySelector<HTMLElement>("#p_b_follow > a");
    if (eleText) {
      return eleText.innerText === "-取消关注" || false;
    } else return false;
  }

  function initSetting() {
    const setting = EcyUtils.getLocalSetting().value;
    const strings = JSON.stringify(EcyUtils.reloadObjProps(setting, EcyUtils.getLocalSettingTemp()));
    localStorage.setItem(`l-${blogApp}-setting`, strings);
    document.documentElement.setAttribute("class", setting.theme.mode);

    const fontFamily = EcyConfig.__ECY_CONFIG__.font.main || `var(--el-font-family)`;
    document.querySelector("html").style.setProperty("--l-font-family", fontFamily);
  }

  function beforeUseLiteInsertElement() {
    const eleApp = document.createElement("div");
    eleApp.setAttribute("id", "app");
    document.body.append(eleApp);
  }

  function afterUseLiteInsertElement() {
    const eleIconLink = document.createElement("link");
    eleIconLink.rel = "shortcut icon";
    eleIconLink.href = __ECY_CONFIG__.icon;
    document.head.append(eleIconLink);
  }

  /**
   * 初始化 lite，所有工作准备完成之后，走回调函数，挂载 app。
   * @param dev 开发模式下直接挂载 app
   * @param pro 生产模式下，打包部署之后，给 window 注册一个函数，等待博客园资源加载完成之后再挂载 app。
   */
  export function useLite(dev: Function, pro: Function) {
    beforeUseLiteInsertElement();

    if (import.meta.env.PROD) {
      blogId = currentBlogId;
      blogApp = currentBlogApp;
      isLogin = isLogined;
      isOwner = isBlogOwner;
      baseAPI = `https://www.cnblogs.com/${blogApp}`;
      userGuid = getUserGuid();
      isFollow = getIsFollow();
      // @ts-ignore
      __ECY_CONFIG__ = window["__ECY_CONFIG__"];
      initSetting();
      pro();
    } else if (import.meta.env.DEV) {
      blogId = import.meta.env.VITE_BLOG_ID;
      blogApp = import.meta.env.VITE_BLOG_APP;
      EcyConfig.blogApp = import.meta.env.VITE_BLOG_APP;
      baseAPI = "/api";
      __ECY_CONFIG__ = {
        cabinet: {},
        covers: {
          matte: {
            index: 0.15,
            works: 0.1
          },
          filter: {
            index: "1.5px",
            works: "20px"
          },
          works: ["https://img1.baidu.com/it/u=726526983,4132763702&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500"],
          index: ["https://gzw.sinaimg.cn/large/0073YlnVgy1h8apu19t61j32yo1o0x6v.jpg"]
        },
        graph: {
          alpha: 0.85,
          sides: 9,
          layer: 6,
          lineWidth: 1,
          textSize: 0.8,
          data: [
            { title: "scss", star: 5 },
            { title: "vue3", star: 5 },
            { title: "vite", star: 4 },
            { title: "js", star: 5 },
            { title: "ts", star: 4 },
            { title: "C", star: 2 },
            { title: "react", star: 2 },
            { title: "uniapp", star: 5 },
            { title: "java", star: 4 }
          ]
        },
        nameplate: {
          tags: ["Web 前端", "二次元", "简约", "拖延症", "吸猫"],
          signature: "Time tick away, dream faded away!",
          connection: [
            {
              name: "Email",
              text: "zhengrenfu@outllok.com",
              img: "https://images.cnblogs.com/cnblogs_com/blogs/666252/galleries/2281365/o_230306161009_wechat.png"
            }
          ],
          intro: "平时喜欢逛 B站，刷短视频、看 Vtuber（DD），如果有喜欢的电视剧就会狂刷。",
          warehouse: [{ text: "cnblogs-theme-ecy", url: "http://www.gitee.com/cnblogs-theme-ecy" }],
          experience: [{ text: "基于 Vue3 的回收平台", date: "22.03.10" }],
          gossip: "抽到水神！",
          photo: {
            disabled: true,
            src: ["https://img2.baidu.com/it/u=803568479,1965819057&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"]
          }
        },
        font: {
          code: "Hack",
          main: ""
        }
      };
      initSetting();
      dev();
    }

    afterUseLiteInsertElement();
    EcyUtils.Log.primary("GitHub", "https://github.com/Himmelbleu/cnblogs-theme-ecy");
    EcyUtils.Log.primary("v1.2.0", "Powered By Himmelbleu using Vue3 & Vite.");
  }
}
