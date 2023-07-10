<script setup lang="ts">
import hljs from "highlight.js";
import { Fancybox } from "@fancyapps/ui";

hljs.configure({
  ignoreUnescapedHTML: true,
  noHighlightRe: /<code class="language-.+?">\s*(tip|war)\s*<\/code>/i
});

const props = defineProps({
  strHtml: {
    type: String,
    required: true
  },
  realHtml: {
    type: HTMLElement,
    required: false
  },
  unocssImg: {
    type: String
  },
  unocssText: {
    type: String
  },
  fancyGroup: {
    type: String,
    required: true
  }
});

const emits = defineEmits(["update:realHtml"]);

const htmlInst = ref<HTMLElement>();
const strHtmlRef = toRef(props, "strHtml");
const markdown = ref("");

function generateMarkdown() {
  let mtcCode, mtcImg;
  let regex1 = /<pre>[\s\S]*?<\/pre>/g;
  let regex2 = /<img[\s\S]*?>/g;

  let c = props.strHtml;

  while ((mtcCode = regex1.exec(c)) !== null) {
    const r = refactorPreCode(mtcCode[0]);
    c = c.replace(mtcCode[0], r);
  }

  let i = c;

  while ((mtcImg = regex2.exec(c)) !== null) {
    const r = refactorImg(mtcImg[0]);
    i = i.replace(mtcImg[0], r);
  }

  return i;
}

function refactorImg(str: string) {
  const mtSrc = str.match(/src="([^"]*)/);
  const mtAlt = str.match(/alt="([^"]*)"/);

  const late = `
    <div class="bleu-img ${props.unocssImg}">
      <div>
        <a href="${mtSrc[1]}" data-fancybox="bleu-gallery-${props.fancyGroup}"
          data-download-src="${mtSrc[1]}" data-caption="${mtAlt ? mtAlt[1] : ""}">
          <img src="${mtSrc[1]}" class="rd-2" alt="${mtAlt ? mtAlt[1] : ""}" />
        </a>
        <div class="bleu-caption f-c-c text-0.8rem text-b">${mtAlt ? mtAlt[1] : ""}</div>
      </div>
    </div>
  `;

  return late;
}

function findTipPreCode(str: string) {
  const regex = /<pre><code class="language-tip">([\s\S]*?)<\/code><\/pre>/;
  const match = str.match(regex);
  let r = "";

  if (match) {
    const content = match[1];

    r = `
<pre class="bleu-tip">
💡提示：
${content}</pre>
    `;
  }

  return r;
}

function findWraPreCode(str: string) {
  const regex = /<pre><code class="language-war">([\s\S]*?)<\/code><\/pre>/;
  const match = str.match(regex);
  let w = "";

  if (match) {
    const content = match[1];

    w = `
<pre class="bleu-war">
❗注意：
${content}</pre>
    `;
  }

  return w;
}

function findNormalPreCode(str: string) {
  const mtMark = str.match(/file:\[([\u4e00-\u9fffa-zA-Z0-9.\-_\s\/]+)\]/);
  const mtAddLine = str.match(/add:\[(.*?)\]/);
  const mtDelLine = str.match(/del:\[(.*?)\]/);

  let addLineNum = 0,
    delLineNum = 0,
    addTemp,
    delTemp;

  if (mtAddLine || mtDelLine) {
    const len = str.split("\n");

    if (mtAddLine) {
      len.forEach((i, index) => {
        const mtAdd = i.match(/add:\[(.*?)\]/);
        if (mtAdd) {
          addLineNum = index;
        }
      });
      addTemp = `<div class="added-line bg-emerald absolute left-0 w-100% opacity-10" style="top: ${
        addLineNum * 1.5
      }rem; height: 1rem"></div>`;
      str = str.replace(/add:\[(.*?)\]/g, `${mtAddLine[1]}`);
    }

    if (mtDelLine) {
      len.forEach((i, index) => {
        const mtDel = i.match(/del:\[(.*?)\]/);
        if (mtDel) {
          delLineNum = index;
        }
      });
      delTemp = `<div class="deled-line bg-red absolute left-0 w-100% opacity-10" style="top: ${
        delLineNum * 1.5
      }rem; height: 1rem"></div>`;
      str = str.replace(/del:\[(.*?)\]/g, `${mtDelLine[1]}`);
    }
  }

  const mark = mtMark ? mtMark[1] : "";
  const lang = str.match(/<code class="language-([\d\w]+)"/)[1].toUpperCase();

  const late = `
      <div class="tools ${mark ? "f-c-b" : "f-c-e"} f-c-b rd-2 text-0.8rem w-100%">
        <div class="left flow-auto white-nowrap scroll-none">${mark || lang + " Code"}</div>
        <div class="right flex-auto f-c-e text-c">
          <div class="language mr-2">${lang}</div>
          <div class="clipboard hover">复制</div>
        </div>
      </div>
      ${!mark ? `<div class="mb-6"></div>` : ""} 
    `;

  if (mark) str = str.replace(/file:\[([\u4e00-\u9fffa-zA-Z0-9.\-_\s\/]+)\]/g, "");

  str = str.replace(
    "<pre>",
    `<div class="bleu-pre">${late}<pre class="relative">${addTemp || ""}${delTemp || ""}`
  );

  return str + "</div></pre>";
}

function refactorPreCode(str: string) {
  const isTip = str.match(/<pre><code class="language-tip">/);
  const isWra = str.match(/<pre><code class="language-war">/);

  if (isTip) {
    return findTipPreCode(str);
  } else if (isWra) {
    return findWraPreCode(str);
  } else {
    return findNormalPreCode(str);
  }
}

function registerMarkdown(mkd: HTMLElement, pre: HTMLElement) {
  mkd.querySelector(".clipboard").addEventListener("click", () => {
    navigator.clipboard.writeText(pre.innerText).then(
      () => ElMessage({ message: "复制成功！", type: "success", grouping: true }),
      () => ElMessage({ message: "没有权限！", type: "error", grouping: true })
    );
  });
}

function renderMarkdown() {
  markdown.value = generateMarkdown();

  nextTick(() => {
    htmlInst.value.querySelectorAll<HTMLElement>(".bleu-pre").forEach(i => {
      const pre = i.querySelector<HTMLElement>("pre code");
      hljs.highlightElement(pre);
      registerMarkdown(i, pre);
    });

    // mathjax
    const mathElArr = htmlInst.value.getElementsByClassName("math");
    if (window.MathJax && mathElArr?.length > 0) {
      window.MathJax.startup.promise = window.MathJax.startup.promise
        .then(() => {
          window.MathJax.typesetPromise(mathElArr);
        })
        .catch(console.error);
    }

    let options = {
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: BleuVars.isPcDevice()
            ? ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY"]
            : [],
          right: ["slideshow", "thumbs", "close"]
        }
      },
      Hash: false
    };

    if (BleuVars.config?.fancybox) {
      const merged = Object.assign({}, options, BleuVars.config.fancybox);
      Fancybox.bind("[data-fancybox]", merged);
    } else {
      Fancybox.bind("[data-fancybox]", options);
    }

    emits("update:realHtml", htmlInst.value);
  });
}

onMounted(renderMarkdown);
watch(strHtmlRef, renderMarkdown);
</script>

<template>
  <div class="markdown-textual" :class="unocssText" ref="htmlInst" v-html="markdown"></div>
</template>
