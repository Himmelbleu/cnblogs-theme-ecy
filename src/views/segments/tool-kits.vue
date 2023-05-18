<script setup lang="ts">
import { useOnWheel, useOnScroll } from "@/hooks/window-events";

const route = useRoute();
const setting = LocalStorage.getSetting();
const isInTop = ref(false);
const isInBottom = ref(true);
const isShowGuide = ref(false);
const isTake = ref(false);
let html: HTMLElement;
let topNail: HTMLElement;
let bottomNail: HTMLElement;
const catalogDisabled = inject<boolean>(ProvideKey.CATALOG_DISABLED);

onMounted(() => {
  html = document.querySelector("html");
  topNail = document.querySelector("#l-top-nail");
  bottomNail = document.querySelector("#l-bottom-nail");

  useOnWheel(
    () => {
      isTake.value = true;
    },
    () => {
      isTake.value = false;
    }
  );

  useOnScroll(
    0.5,
    () => {
      isInTop.value = true;
      isInBottom.value = false;
    },
    () => {
      isInBottom.value = true;
      isInTop.value = false;
    }
  );
});

function moveScroll(dom: HTMLElement) {
  dom.scrollIntoView();
  isInTop.value = !isInTop.value;
  isInBottom.value = !isInBottom.value;
}

function toggleMode() {
  if (setting.value.theme.mode === "dark") {
    html.className = "light";
    setting.value.theme.mode = "light";
  } else {
    html.className = "dark";
    setting.value.theme.mode = "dark";
  }
}

watch(route, () => {
  if (route.name !== RouterName.WORKS) {
    isShowGuide.value = false;
  } else {
    isShowGuide.value = true;
  }
});
</script>

<template>
  <div id="l-toolkits" :class="{ 'take-toolkits': isTake, 'intake-toolkits': !isTake }" class="fixed z-99 right-0 top-55vh l-size-4">
    <div
      v-show="isShowGuide"
      :class="{ 'show-0': setting.toolkits.pin, 'close-0': !setting.toolkits.pin }"
      class="absolute hover left-0 rd-2 l-back-bg"
      @click="catalogDisabled = !catalogDisabled">
      <div class="f-c-c w-8 h-8">
        <i-ep-guide />
      </div>
    </div>
    <div
      :class="{ 'show-1': setting.toolkits.pin, 'close-1': !setting.toolkits.pin }"
      class="absolute hover left-0 rd-2 l-back-bg"
      @click="Navigation.go({ path: RouterPath.HOME(), router: $router })">
      <div class="f-c-c w-8 h-8">
        <i-ep-house />
      </div>
    </div>
    <div
      :class="{ 'show-2': setting.toolkits.pin, 'close-2': !setting.toolkits.pin }"
      class="absolute hover left-0 rd-2 l-back-bg"
      @click="Navigation.go({ path: 'back', router: $router })">
      <div class="f-c-c w-8 h-8">
        <i-ep-location />
      </div>
    </div>
    <div
      :class="{ 'show-3': setting.toolkits.pin, 'close-3': !setting.toolkits.pin }"
      class="absolute hover left-0 rd-2 l-back-bg"
      @click="isInTop ? moveScroll(topNail) : moveScroll(bottomNail)">
      <div class="f-c-c w-8 h-8">
        <i-ep-upload :class="{ 'top-nav': isInTop, 'bottom-nav': isInBottom }" />
      </div>
    </div>
    <div
      :class="{ 'show-4': setting.toolkits.pin, 'close-4': !setting.toolkits.pin }"
      class="absolute hover left-0 rd-2 l-back-bg"
      @click="toggleMode">
      <div class="f-c-c w-8 h-8">
        <i-ep-moon v-show="setting.theme.mode === 'dark'" />
        <i-ep-sunny v-show="setting.theme.mode === 'light'" />
      </div>
    </div>
    <div
      :class="{ 'show-5': setting.toolkits.pin, 'close-5': !setting.toolkits.pin }"
      class="absolute hover left-0 rd-2 l-back-bg"
      @click="Navigation.go({ path: 'https://i.cnblogs.com' })">
      <div class="f-c-c w-8 h-8">
        <i-ep-setting />
      </div>
    </div>
    <div
      @click="setting.toolkits.pin = !setting.toolkits.pin"
      :class="{ 'take-items': setting.toolkits.pin, 'intake-items': !setting.toolkits.pin }"
      class="kits-box absolute hover top-60 left-0 rd-2 l-back-bg">
      <div class="f-c-c w-8 h-8">
        <i-ep-more />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$show-top: 0;
$show-anitime: 0.1s;
$close-top: 15rem;
$close-anitime: 0.7s;
$move-step: 2.5rem;

@for $index from 0 to 6 {
  @if $index != 0 {
    $show-top: $show-top + $move-step;
  }

  .show-#{$index} {
    $show-anitime: $show-anitime + math.div($index, 10);
    animation: show-#{$index}-animation $show-anitime ease-in;
    top: $show-top;
  }

  .close-#{$index} {
    $close-anitime: $close-anitime - math.div($index, 10);
    animation: close-#{$index}-animation $close-anitime ease-in;
    top: $close-top;
    z-index: -1;
  }

  @keyframes show-#{$index}-animation {
    $step: $close-top;

    @for $i from 0 to 11 {
      #{$i * 10%} {
        top: $step;
        $step: $step - math.div($close-top - $index * $move-step, 10);
      }
    }
  }

  @keyframes close-#{$index}-animation {
    @for $i from 0 to 11 {
      #{ $i * 10%} {
        top: $show-top + $i * math.div($close-top - $show-top, 10);
      }
    }
  }
}

.take-toolkits {
  animation: take-toolkits-animation 0.3s linear;
  right: 5rem;
}

@keyframes take-toolkits-animation {
  @for $i from 0 to 11 {
    #{$i * 10%} {
      right: calc($i * 0.5rem);
    }
  }
}

.intake-toolkits {
  animation: intake-toolkits-animation 0.3s linear;
}

@keyframes intake-toolkits-animation {
  @for $i from 0 to 11 {
    #{$i * 10%} {
      right: calc(5rem + $i * -0.5rem);
    }
  }
}

.take-items {
  transition: var(--l-animation-effect);
  transform: rotate(0);
}

.intake-items {
  transition: var(--l-animation-effect);
  transform: rotate(180deg);
}

.top-nav {
  transition: var(--l-animation-effect);
  transform: rotate(0);
}

.bottom-nav {
  transition: var(--l-animation-effect);
  transform: rotate(180deg);
}
</style>
