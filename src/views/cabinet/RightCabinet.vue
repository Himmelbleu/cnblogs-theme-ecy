<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: true
  }
});

const setting = EcyUtils.getSetting();
const collapseActive = ref("1");

const right = computed(() => {
  return setting.value.cabinet.right.pin && setting.value.cabinet.position.break ? setting.value.cabinet.position.right + "vw" : 0;
});

const block = computed(() => {
  return !props.disabled && !setting.value.cabinet.right.pin;
});

const hidden = computed(() => {
  return props.disabled && !setting.value.cabinet.right.pin;
});

const fixed = computed(() => {
  return setting.value.cabinet.right.pin && !setting.value.cabinet.position.break;
});
</script>

<template>
  <Card
    id="l-rcabinet"
    style="width: var(--cabinet-width)"
    :style="{ right: right }"
    class="noscroll l-fiv-size h-100vh ofw-auto fixed top-0 right-0"
    :class="{ 'show-rcabinet z-4': block, 'hidden-rcabinet': hidden, 'fixed-rcabinet': fixed }"
    :padding="setting.cabinet.right.padding"
    :margin="setting.cabinet.right.margin">
    <ExpandableBox text="我的技术栈" v-if="EcyConfig.__ECY_CONFIG__.graph">
      <template #icon>
        <i-ep-aim />
      </template>
      <SkillGraph />
    </ExpandableBox>
    <ExpandableBox text="常用链接" v-if="EcyConfig.__ECY_CONFIG__.links && EcyConfig.__ECY_CONFIG__.links.length">
      <template #icon>
        <i-ep-link />
      </template>
      <a class="hover block mb-3" v-for="item in EcyConfig.__ECY_CONFIG__.links" :href="item.href" target="_blank">
        {{ item.text }}
      </a>
    </ExpandableBox>
    <ExpandableBox text="推荐书籍" v-if="EcyConfig.__ECY_CONFIG__.books && EcyConfig.__ECY_CONFIG__.books.length">
      <template #icon>
        <i-ep-notebook />
      </template>
      <div class="mb-3 f-c-b" v-for="item in EcyConfig.__ECY_CONFIG__.books">
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
  </Card>
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
