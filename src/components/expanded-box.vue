<script setup lang="ts">
const { text, showIcon } = defineProps({
  text: {
    type: String,
    required: true
  },
  showIcon: {
    type: Boolean,
    default: true
  }
});

const boxInst = ref();
const boxWrapInst = ref();
const isDownArrow = ref(true);
const boxWrapInstHeight = ref(0);
let lastBoxWrapInstHeight = 0;

// 开启监听，当异步函数渲染完成之后最后一次高度就是最终的高度
const observer: ResizeObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    boxWrapInstHeight.value = entry.target.offsetHeight;
    // console.log(boxWrapInstHeight.value);
  });
});

function toggle() {
  // 当收起面板时，将 boxWrapInstHeight 设置为0，那么整个面板就没了
  if (isDownArrow.value) {
    lastBoxWrapInstHeight = boxWrapInstHeight.value;
    // observer.unobserve(boxWrapInst.value);
    boxWrapInstHeight.value = 0;
  } else {
    // observer.observe(boxWrapInst.value);
    boxWrapInstHeight.value = lastBoxWrapInstHeight;
  }
  isDownArrow.value = !isDownArrow.value;
}

onMounted(() => {
  observer.observe(boxWrapInst.value);
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<template>
  <div class="l-expbox mb-6">
    <div class="title" select-none mb-4 f-c-b l-size-5 l-color-1>
      <div f-c-s>
        <div f-c-c mr-1>
          <slot name="icon"></slot>
        </div>
        {{ text }}
      </div>
      <div v-if="showIcon" @click="toggle" class="hover effect f-c-c" :class="{ 'arrow-up': !isDownArrow, 'arrow-down': isDownArrow }">
        <div class="arrow effect f-c-c">
          <i-ep-arrow-down />
        </div>
      </div>
    </div>
    <div l-color-2 flow-hidden class="effect" ref="boxInst" :style="{ height: boxWrapInstHeight + 'px' }">
      <div ref="boxWrapInst">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  padding-left: 0.4rem;
  border-radius: 0.25rem;
  border-left: 0.25rem solid var(--el-color-primary);
}

.title:hover .arrow {
  transform: scale(1, 1);
}

.arrow {
  transform: scale(0, 0);
}

.arrow-up {
  transform: rotate(180deg);
}

.arrow-down {
  transform: rotate(0deg);
}

.effect {
  transition: var(--l-animation-effect);
}
</style>
