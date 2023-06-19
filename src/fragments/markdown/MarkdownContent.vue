<script setup lang="ts">
import { createCodeTools, createCodeModal } from "./index";
import hljs from "highlight.js";

defineProps({
  htmlStr: {
    type: String,
    required: true
  },
  realHtml: {
    type: HTMLElement,
    required: false
  }
});

let isFirstRendering = 0;
const emits = defineEmits(["update:realHtml"]);
const htmlInst = ref<HTMLElement>();

function renderMarkdown() {
  // hljs
  hljs.configure({
    ignoreUnescapedHTML: true
  });

  const preCodeInst = htmlInst.value.querySelectorAll<HTMLElement>("pre code");

  preCodeInst.forEach(i => {
    hljs.highlightElement(i);
    createCodeTools(i);
    createCodeModal(i);
  });

  // math
  const MathJax = window.MathJax;
  const mathNodes = htmlInst.value.getElementsByClassName("math");

  if (MathJax && mathNodes.length > 0) {
    MathJax.startup.promise = MathJax.startup.promise
      .then(() => {
        MathJax.typesetPromise(mathNodes);
      })
      .catch(console.error);
  }

  emits("update:realHtml", htmlInst.value);
}

onMounted(() => {
  isFirstRendering++;
  renderMarkdown();
});

onUpdated(() => {
  isFirstRendering++;
  if (isFirstRendering > 2) {
    renderMarkdown();
  }
});
</script>

<template>
  <div class="markdown-textual" ref="htmlInst" v-html="htmlStr"></div>
</template>
