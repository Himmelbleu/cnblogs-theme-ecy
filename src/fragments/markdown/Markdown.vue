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

const htmlInst = ref<HTMLElement>();
const strHtmlRef = toRef(props, "strHtml");
const markdown = ref("");

function generateMarkdown() {
  let mtc;
  let str = props.strHtml;
  let regex = /<pre>[\s\S]*?<\/pre>/g;

  while ((mtc = regex.exec(props.strHtml)) !== null) {
    const pre = refactorMarkdown(mtc[0]);
    str = str.replace(mtc[0], pre);
  }

  return str;
}

function refactorMarkdown(str: string) {
  const mt = str.match(/file:([\d\w\.\-\_/]+)/);
  const fn = mt ? mt[1] : "";
  const lg = str.match(/<code class="language-([\d\w]+)"/)[1].toUpperCase();

  const t = `
    <div class="tools ${fn ? "f-c-b" : "f-c-e"} f-c-b rd-2 rd-2 text-0.8rem w-100%">
      ${fn ? `<div class="right">${fn}</div>` : ""}
      <div class="left f-c-b text-c">
        <div class="language mr-2">${lg}</div>
        <div class="clipboard hover">复制</div>
      </div>
    </div>
  `;

  str = str.replace(/file:([\d\w\.\-\_/])*/g, "");
  str = str.replace("<pre>", `<div class="bleu-pre">${t}<pre>`);

  return str + "</div></pre>";
}

function registerMarkdown(mkd: HTMLElement, pre: HTMLElement) {
  const clip = mkd.querySelector(".clipboard");
  clip.addEventListener("click", () => {
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
    const mathNodes = htmlInst.value.getElementsByClassName("math");
    if (window.MathJax && mathNodes?.length > 0) {
      window.MathJax.startup.promise = window.MathJax.startup.promise
        .then(() => {
          window.MathJax.typesetPromise(mathNodes);
        })
        .catch(console.error);
    }

    emits("update:realHtml", htmlInst.value);
  });
}

onMounted(renderMarkdown);
watch(strHtmlRef, renderMarkdown);
</script>

<template>
  <div class="markdown-textual" ref="htmlInst" :style="styleCss" v-html="markdown"></div>
</template>
