<script setup lang="ts">
import hljs from "highlight.js";

hljs.configure({
  ignoreUnescapedHTML: true
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
  styleCss: {
    type: Object,
    required: false
  }
});

const emits = defineEmits(["update:realHtml"]);

const strMarkdown = ref("");

function splitPreStr(str: string) {
  const arr = str.split(/<\/pre>/g);
  arr.pop();
  return arr;
}

function generatePreStr(str: string) {
  const mt = str.match(/file:([\d\w\.\-\_/]+)/);
  const filename = mt ? mt[1] : "";
  const language = str.match(/<code class="language-([\d\w]+)"/)[1].toUpperCase();

  const template = `
    <div class="code-tools ${filename ? "f-c-b" : "f-c-e"} f-c-b rd-2 rd-2 text-0.8rem w-100%">
      ${filename ? `<div class="right">${filename}</div>` : ""}
      <div class="left f-c-b text-c">
        <div class="code-language mr-2">${language}</div>
        <div class="code-clipboard hover">复制</div>
      </div>
    </div>
  `;

  str = str.replace(/file:([\d\w\.\-\_/])*/g, "");
  str = str.replace("<pre>", `<div class="bleu-markdown">${template}<pre>`);

  return str + "</div></pre>";
}

function generateMarkdownStr() {
  let strMarkdown = "";
  const pres = splitPreStr(props.strHtml);

  for (let i = 0; i < pres.length; i++) {
    strMarkdown += generatePreStr(pres[i]);
  }

  return strMarkdown;
}

function generateClipEvent(mkInst: HTMLElement, cnInst: HTMLElement) {
  const clipboard = mkInst.querySelector(".code-clipboard");
  clipboard.addEventListener("click", () => {
    navigator.clipboard.writeText(cnInst.innerText).then(
      () => ElMessage({ message: "复制成功！", type: "success", grouping: true }),
      () => ElMessage({ message: "没有权限！", type: "error", grouping: true })
    );
  });
}

let times = 0;
const htmlInst = ref<HTMLElement>();

function render() {
  const mkArrInst = htmlInst.value.querySelectorAll<HTMLElement>(".bleu-markdown");

  mkArrInst.forEach((mkInst, index) => {
    const preInst = mkInst.querySelector<HTMLElement>("pre code");
    hljs.highlightElement(preInst);
    generateClipEvent(mkInst, preInst);
  });

  // mathjax
  const mathNodes = htmlInst.value.getElementsByClassName("math");

  if (window.MathJax && mathNodes.length > 0) {
    window.MathJax.startup.promise = window.MathJax.startup.promise
      .then(() => {
        window.MathJax.typesetPromise(mathNodes);
      })
      .catch(console.error);
  }

  emits("update:realHtml", htmlInst.value);
}

onBeforeMount(() => {
  strMarkdown.value = generateMarkdownStr();
});

onMounted(() => {
  times++;
  render();
});

onUpdated(() => {
  times++;
  if (times > 2) {
    strMarkdown.value = generateMarkdownStr();
    render();
  }
});
</script>

<template>
  <div class="markdown-textual" ref="htmlInst" :style="styleCss" v-html="strMarkdown"></div>
</template>
