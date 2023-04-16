import $ from "jquery";
import hljs from "highlight.js";
import { useCatalogStore } from "@/store";

function createCodeFolder(ele: JQuery<HTMLElement>) {
  const height = ele.height();

  if (height >= 380) {
    ele.height(380);
    const $click = $(`<div class="close-code-modal l-fiv-size l-thr-color hover">展开</div>`);
    const $modal = $(`<div class="hight-code-modal f-c-c rd-2"></div>`);
    $modal.prepend($click);

    $click.on("click", () => {
      ele.height(height);
      ele.removeClass("hight-code-modal");
      $modal.css({ display: "none" });
    });

    ele.parent().prepend($modal);
  }
}

function createCodeClipboard(ele: JQuery<HTMLElement>) {
  const clipboard = $(`<span class="clipboard hover mr-2">复制</span>`);

  clipboard.on("click", () => {
    const text = ele.text();
    navigator.clipboard.writeText(text).then(
      () => {
        ElMessage({ message: "复制成功！", type: "success", grouping: true });
      },
      () => {
        ElMessage({ message: "没有权限！", type: "error", grouping: true });
      }
    );
  });

  ele.parent().find(".code-block").prepend(clipboard);
}

function createHighslide(ele: JQuery<HTMLElement>) {
  const image = $(".l-highslide .l-highslide__img");

  ele.on("click", () => {
    $(".l-highslide").removeClass("noactive").addClass("active");
    $("body").css({ overflow: "hidden" });
    image.attr("src", ele.attr("src"));
    image.css({ width: ele.width(), height: ele.height() });
  });

  const eleParent = ele.parent("p");
  eleParent.addClass("f-c-c flex-col");
  eleParent.append(`<div class="l-sec-color l-fiv-size mt-2">${ele.attr("alt")}</div>`);
}

function createCodeLang(ele: JQuery<HTMLElement>) {
  const lang = ele
    .attr("class")
    ?.match(/(language-\w*){0,1}/g)[0]
    .split(",")[0]
    .split("-")[1]
    .toUpperCase();

  ele.parent().prepend(`<div class="code-block l-six-size l-thr-color">${lang}</div>`);
}

function useVHljs(el: any) {
  $(el)
    .find("pre code")
    .each((index, ele) => {
      const $ele = $(ele);

      hljs.highlightElement(ele);
      createCodeLang($ele);
      createCodeFolder($ele);
      createCodeClipboard($ele);
    });

  $(el)
    .find("img")
    .each((index, ele) => {
      createHighslide($(ele));
    });
}

function useVMathjax(el: any) {
  // @ts-ignore
  const MathJax = window.MathJax;
  const nodes = document.querySelectorAll(".math");

  if (MathJax && nodes.length > 0) {
    MathJax.startup.promise = MathJax.startup.promise.then(() => MathJax.typesetPromise(nodes)).catch((err: any) => console.error(err));
  }
}

function useVCatalog(el: any) {
  const catalog = <any>[];

  let h1 = 0;
  let h2 = 0;
  let h3 = 0;
  let item = ``;

  $(el)
    .children("h1,h2,h3")
    .each((i, e) => {
      const id = $(e).attr("id");
      const type: string = $(e)[0].localName;
      const level = EcyConfig.__ECY_CONFIG__.other?.catalog?.level;
      let content = ``;
      item = `${$(e).text()}`;

      if (type === "h1") {
        h1++;
        h2 = 0;
        h3 = 0;
        if (level) item = `${h1}.${item}`;
        content = `<div id="catalog-${id}" class="hover">${item}</div>`;
      } else if (type === "h2") {
        h2++;
        h3 = 0;
        if (level) item = `${h1}.${h2}.${item}`;
        content = `<div id="catalog-${id}" class="hover" style="margin-left: 10px">${item}</div>`;
      } else if (type === "h3") {
        h3++;
        if (level) item = `${h1}.${h2}.${h3}.${item}`;
        content = `<div id="catalog-${id}" class="hover" style="margin-left: 20px">${item}</div>`;
      }

      catalog.push({ id, content });
    });

  useCatalogStore().setCatalog(catalog);
}

function useCatalogEvents(el: any, binding: any) {
  $(`#catalog-${binding.value.id}`).on("click", () => {
    document.querySelector(`#${binding.value.id}`).scrollIntoView();
  });
}

export function useDirective(Vue: any) {
  /**
   * 对 pre code 代码进行格式化
   */
  Vue.directive("hljs", {
    mounted(el: any) {
      useVHljs(el);
    },
    updated(el: any) {
      useVHljs(el);
    }
  });

  /**
   * 对指定元素下的标签进行数学公式格式化
   */
  Vue.directive("mathjax", {
    mounted(el: any) {
      useVMathjax(el);
    },
    updated(el: any) {
      useVMathjax(el);
    }
  });

  /**
   * 制作目录锚点
   */
  Vue.directive("catalog", {
    mounted(el: any) {
      useVCatalog(el);
    },
    updated(el: any) {
      useVCatalog(el);
    }
  });

  /**
   * 制作目录锚点的点击事件
   */
  Vue.directive("cateve", {
    mounted(el: any, binding: any) {
      useCatalogEvents(el, binding);
    },
    updated(el: any, binding: any) {
      useCatalogEvents(el, binding);
    }
  });
}
