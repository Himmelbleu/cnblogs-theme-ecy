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

const bleuMk = ref("");

function buildBleuPre(str: string) {
  let regex = /<pre>[\s\S]*?<\/pre>/g;
  let match;
  let _str = str;

  while ((match = regex.exec(str)) !== null) {
    const pre = buildBleuPreStr(match[0]);
    _str = _str.replace(match[0], pre);
  }

  return _str;
}

function buildBleuPreStr(str: string) {
  const mt = str.match(/file:([\d\w\.\-\_/]+)/);
  const fn = mt ? mt[1] : "";
  const lg = str.match(/<code class="language-([\d\w]+)"/)[1].toUpperCase();

  const template = `
    <div class="tools ${fn ? "f-c-b" : "f-c-e"} f-c-b rd-2 rd-2 text-0.8rem w-100%">
      ${fn ? `<div class="right">${fn}</div>` : ""}
      <div class="left f-c-b text-c">
        <div class="language mr-2">${lg}</div>
        <div class="clipboard hover">复制</div>
      </div>
    </div>
  `;

  str = str.replace(/file:([\d\w\.\-\_/])*/g, "");
  str = str.replace("<pre>", `<div class="bleu-pre">${template}<pre>`);

  return str + "</div></pre>";
}

function registerClipboardEvent(mkInst: HTMLElement, cnInst: HTMLElement) {
  const clipboard = mkInst.querySelector(".clipboard");
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
  const mkArrInst = htmlInst.value.querySelectorAll<HTMLElement>(".bleu-pre");

  mkArrInst.forEach((mkInst, index) => {
    const preInst = mkInst.querySelector<HTMLElement>("pre code");
    hljs.highlightElement(preInst);
    registerClipboardEvent(mkInst, preInst);
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
  bleuMk.value = buildBleuPre(props.strHtml);
});

onMounted(() => {
  times++;
  render();
});

onUpdated(() => {
  times++;
  if (times > 2) {
    bleuMk.value = buildBleuPre(props.strHtml);
    render();
  }
});
</script>

<template>
  <div class="markdown-textual" ref="htmlInst" :style="styleCss" v-html="bleuMk"></div>
</template>
