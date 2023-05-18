export namespace EcyVars {
  export let config: EcyConfig;
  export let userGuid = "";
  export let isFollow = false;
  export const pcDevice = isPcDevice();

  export function getBlogApp() {
    if (import.meta.env.DEV) {
      return import.meta.env.VITE_BLOG_APP;
    } else {
      return currentBlogApp;
    }
  }

  export function getBlogId() {
    if (import.meta.env.DEV) {
      return import.meta.env.VITE_BLOG_ID;
    } else {
      return currentBlogId;
    }
  }

  export function getBaseURL() {
    if (import.meta.env.PROD) {
      return `https://www.cnblogs.com/${getBlogApp()}`;
    } else {
      return "/api";
    }
  }

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
    const eleText = document.querySelector("#p_b_follow > a");
    if (eleText) {
      return eleText.innerText === "-取消关注" || false;
    } else return false;
  }

  function loadedEcy() {
    const setting = LocalStorage.getSetting().value;
    const settingStr = JSON.stringify(LocalStorage.reloadObjProps(setting, LocalStorage.getSettingTemp()));
    localStorage.setItem(`l-${getBlogApp()}-setting`, settingStr);
    document.documentElement.setAttribute("class", setting.theme.mode);

    const fontFamily = config.font.main || `var(--el-font-family)`;
    document.querySelector("html").style.setProperty("--l-font-family", fontFamily);
  }

  function beforeUseEcy() {
    const app = document.createElement("div");
    app.setAttribute("id", "app");
    document.body.append(app);
  }

  function afterUseEcy() {
    const icon = document.createElement("link");
    icon.rel = "shortcut icon";
    icon.href = config.icon;
    document.head.append(icon);

    PrettifyLog.primary("GitHub", "https://github.com/Himmelbleu/cnblogs-theme-ecy");
    PrettifyLog.primary("v1.3.0", "The Theme was Created By Himmelbleu, and Powered By Vue3 & Vite.");
  }

  export function useLite(dev: Function, pro: Function) {
    beforeUseEcy();

    if (import.meta.env.PROD) {
      userGuid = getUserGuid();
      isFollow = getIsFollow();
      config = window["__ECY_CONFIG__"];
      loadedEcy();
      pro();
    } else if (import.meta.env.DEV) {
      config = {
        menu: {},
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
        font: {
          code: "Hack",
          main: ""
        }
      };
      loadedEcy();
      dev();
    }

    afterUseEcy();
  }
}
