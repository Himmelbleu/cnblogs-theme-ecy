<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: true
  }
});

const block = computed(() => {
  return !props.disabled;
});

const hidden = computed(() => {
  return props.disabled;
});
</script>

<template>
  <div
    id="l-rcabinet"
    style="width: var(--cabinet-width)"
    class="noscroll l-fiv-size h-100vh ofw-auto fixed top-0 right-0 bg-#191919 p-3"
    :class="{ 'show-rcabinet z-99': block, 'hidden-rcabinet': hidden }">
    <ExpandableBox text="常用链接" v-if="EcyConfig.__ECY_CONFIG__.cabinet.links && EcyConfig.__ECY_CONFIG__.cabinet.links.length">
      <template #icon>
        <i-ep-link />
      </template>
      <a class="hover block mb-3" v-for="item in EcyConfig.__ECY_CONFIG__.cabinet.links" :href="item.href" target="_blank">
        {{ item.text }}
      </a>
    </ExpandableBox>
    <ExpandableBox text="推荐书籍" v-if="EcyConfig.__ECY_CONFIG__.cabinet.books && EcyConfig.__ECY_CONFIG__.cabinet.books.length">
      <template #icon>
        <i-ep-notebook />
      </template>
      <div class="mb-3 f-c-b" v-for="item in EcyConfig.__ECY_CONFIG__.cabinet.books">
        <img class="h-25 w-20" :src="item.img" alt="FAILED" />
        <div style="width: calc(100% - 6rem)">
          <div class="mb-1" v-if="!item.href">
            <span>{{ item.text }}</span>
          </div>
          <div class="mb-2" v-else>
            <a class="hover" target="_blank" :href="item.href">
              {{ item.text }}
            </a>
          </div>
          <div class="mb-1">{{ item.author }}</div>
          <el-rate style="width: 100%" v-model="item.rate" disabled size="small" />
        </div>
      </div>
    </ExpandableBox>
  </div>
</template>

<style scoped lang="scss">
$quota: 10;

#l-rcabinet {
  transition: var(--l-transition);
}

.fixed-rcabinet {
  left: calc(calc(var(--content-width) / 2) + var(--content-width) + 2rem) !important;
}

.show-rcabinet {
  animation: showrcabinet 0.2s ease-in;
  transform: translateX(0);
}

@keyframes showrcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(calc(var(--cabinet-width) + calc($i * calc(calc(-1 * var(--cabinet-width)) / 10))));
    }
  }
}

.hidden-rcabinet {
  animation: hiddenrcabinet 0.2s ease-out;
  transform: translateX(var(--cabinet-width));
}

@keyframes hiddenrcabinet {
  @for $i from 0 to $quota {
    #{$i * 10%} {
      transform: translateX(calc($i * calc(var(--cabinet-width) / 10)));
    }
  }
}
</style>
