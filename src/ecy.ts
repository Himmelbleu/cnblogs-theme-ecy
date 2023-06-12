function loadedEcy() {
  function setFontFamily() {
    const fontFamily = EcyVars.config.font.main || `var(--el-font-family)`;
    const codeFontFamily = EcyVars.config.font.code || `var(--el-font-family)`;
    document.querySelector("html").style.setProperty("--l-font-family", fontFamily);
    document.querySelector("html").style.setProperty("--l-code-font-family", codeFontFamily);
  }

  function setLocalSetting() {
    const setting = LocalStorage.getSetting().value;
    const settingStr = JSON.stringify(
      LocalStorage.reloadObjProps(setting, LocalStorage.getSettingTemp())
    );
    localStorage.setItem(`l-${EcyVars.getBlogApp()}-setting`, settingStr);
    document.documentElement.setAttribute("class", setting.theme.mode);
  }

  setFontFamily();
  setLocalSetting();
}

function beforeUseEcy() {
  const app = document.createElement("div");
  app.setAttribute("id", "app");
  document.body.append(app);
}

function afterUseEcy() {
  const icon = document.createElement("link");
  icon.rel = "shortcut icon";
  icon.href = EcyVars.config.icon;
  document.head.append(icon);

  PrettifyLog.primary("GitHub", "https://github.com/Himmelbleu/cnblogs-theme-ecy");
  PrettifyLog.primary("v2.0.0", "The Theme was Created By Himmelbleu, and Powered By Vue3 & Vite.");
}

export function useEcy(dev: Function, pro: Function) {
  beforeUseEcy();

  if (import.meta.env.PROD) {
    EcyVars.config = window["__ECY_CONFIG__"];
    loadedEcy();
    pro();
  } else if (import.meta.env.DEV) {
    EcyVars.config = {
      images: {
        bg: {
          src: "https://th.bing.com/th/id/R.e79036ab9e7ef09bd5951536125c60ac?rik=qzIaIiYX81%2fOAA&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20181103%2ffeaa7d14883047fb81bbaa16f681f583.jpeg&ehk=hywgeurG%2fR6NTPM5A6bkA4YGllkcUFzqDTWm%2fxfDeDU%3d&risl=&pid=ImgRaw&r=0",
          opacity: 0.03
        },
        home: {
          divider: "https://img.soogif.com/7Qhba91zLWe1Q55zyeCxw82hsSxH5UmG.gif",
          carousel: [
            "https://anime.shochiku.co.jp/sukimega/wp-content/themes/sukimega_first_theme/common2/images/top_content_kv01.jpg",
            "https://anime.shochiku.co.jp/sukimega/wp-content/themes/sukimega_first_theme/common2/images/top_content_kv02.jpg",
            "https://anime.shochiku.co.jp/sukimega/wp-content/themes/sukimega_first_theme/common2/images/top_content_kv03.jpg",
            "https://anime.shochiku.co.jp/sukimega/wp-content/themes/sukimega_first_theme/common2/images/top_content_kv04.jpg"
          ]
        }
      },
      graph: {
        alpha: 1,
        sides: 9,
        layer: 6,
        lineWidth: 0.8,
        textSize: 1,
        fillColor: "#409effb8",
        strokeColor: "#409effb8",
        textColor: "#383838f8",
        lineColor: "#383838f8",
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
