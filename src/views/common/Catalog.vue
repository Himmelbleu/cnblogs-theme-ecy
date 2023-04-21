<script setup lang="ts">
import { useCatalogStore } from "@/store";

const route = useRoute();
const translate = shallowRef("");
const anchors = shallowRef([]);
const store = useCatalogStore();
let observer: IntersectionObserver;

function useObserver(entries: any) {
  // @ts-ignore
  const offseTop = window.innerHeight * 0.5 + entries[0].target.offsetTop - entries[0].target.clientHeight;
  if (window.scrollY >= offseTop && window.scrollY - 100 <= offseTop) {
    for (let i = 0; i < anchors.value.length; i++) {
      document.querySelector(`#catalog-${anchors.value[i].id}`).classList.remove("catalog-active");
    }
    const item = document.querySelector(`#catalog-${entries[0].target.id}`);
    const step = item.getAttribute("data-step");
    translate.value = step;
    item.classList.add("catalog-active");
  }
}

observer = new IntersectionObserver(useObserver, {
  threshold: [0, 1]
});

onUnmounted(() => {
  observer.disconnect();
});

watch(route, () => {
  if (route.name !== RouterName.Works) {
    anchors.value = [];
    observer.disconnect();
  }
});

store.$onAction(({ args }) => {
  observer.disconnect();
  anchors.value = args[0];
  for (let i = 0; i < anchors.value.length; i++) {
    observer.observe(anchors.value[i].item);
  }
}, true);
</script>

<template>
  <div id="l-catalog" class="fixed top-5vh h-90vh noscroll flow-auto" v-show="anchors && anchors.length">
    <div class="relative">
      <div class="ml-6 l-color-2">
        <div class="l-size-1 mb-4 h-1.5rem f-c-s" v-for="item in anchors" v-html="item.content" v-catalog-event="item" />
      </div>
      <div class="absolute slider-track"></div>
      <div class="absolute slider" :style="{ transform: 'translate(0, ' + translate + 'rem)' }"></div>
    </div>
  </div>
</template>

<style lang="scss">
.catalog-active {
  color: var(--l-hight-color-1);
}
</style>

<style scoped lang="scss">
.slider {
  transition: var(--l-animation-effect);
  width: 0.25rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  background-color: var(--el-color-primary);
  top: 0;
  left: 0;
}

.slider-track {
  width: 0.25rem;
  height: 100%;
  border-radius: 0.25rem;
  background-color: var(--l-color-1);
  opacity: 0.1;
  top: 0;
  left: 0;
}

@include pc() {
  #l-catalog {
    left: calc(55vw * 1.48);
  }
}

@include mb() {
  #l-catalog {
    right: 0;
  }
}
</style>
