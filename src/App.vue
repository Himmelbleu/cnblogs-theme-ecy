<script setup lang="ts">
const isActiveMenu = ref(false);
const catalogDisabled = ref(!EcyVars.pcDevice);
const codeFontFamily = EcyVars.config.font.code || `var(--el-font-family)`;

provide(ProvideKey.CATALOG_DISABLED, catalogDisabled);
</script>

<template>
  <!-- progress -->
  <div id="l-progress" class="z-9999 fixed left-0 top-0 w-100vw">
    <div class="track absolute top-0">
      <div class="bar rd-2"></div>
    </div>
  </div>
  <!-- content -->
  <div id="l-content" class="fade-in-out relative z-9" @click="isActiveMenu = false">
    <div id="l-top-nail"></div>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive :include="[RouterName.HOME, RouterName.MARK_LIST, RouterName.WORKS_BY_CALENDAR]">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
    <div id="l-bottom-nail"></div>
  </div>
  <!-- background -->
  <div class="l-background fixed top-0 left-0 w-100vw h-100vh opacity-3"></div>
  <!-- github -->
  <div v-show="!isActiveMenu" class="l-github fixed left-0 bottom-0 z-9" m="l-2">
    <div class="f-c-c flex-col">
      <div class="write-vertical-left font-main bounce" m="b-4" text="4 c">
        {{ EcyVars.getBlogApp() }}'s Github
      </div>
      <div
        @click="Navigation.go({ path: 'www.github.com/himmelbleu' })"
        class="i-tabler-brand-github cursor-pointer"
        text="c 7"
        m="b-4"></div>
    </div>
  </div>
  <!-- menu -->
  <div class="l-menu font-main">
    <div
      @click="isActiveMenu = !isActiveMenu"
      class="transition-all-300 select-none cursor-pointer f-c-c w-20 h-20 fixed top-0 z-99"
      :class="{
        'static-menu left--16 hover:left-0': !isActiveMenu,
        'active-menu left-0': isActiveMenu
      }"
      b="rd-rb-4">
      <div v-show="!isActiveMenu">
        <div class="i-tabler-menu2 text-10" />
        <div text="center 1">菜单</div>
      </div>
      <div v-show="isActiveMenu">
        <div text="15" class="i-tabler-x cursor-pointer" />
      </div>
    </div>
    <div
      class="menu-body transition-all-300 fixed top-0 left-0 w-70 h-100vh z-90"
      :class="{ 'close-menu-body': !isActiveMenu, 'open-menu-body': isActiveMenu }">
      <div class="relative f-c-s flow-hidden h-100%">
        <div class="menu-list ml-7 font-bold">
          <div class="hover mb-10">标签分类</div>
          <div class="hover mb-10">随笔分类</div>
          <div class="hover mb-10">随笔档案</div>
          <div class="hover mb-10">文章分类</div>
          <div class="hover mb-10">文章档案</div>
          <div class="hover mb-10">最新随笔</div>
          <div class="hover mb-10">最新评论</div>
          <div class="hover mb-10">我的相册</div>
          <div class="hover">博客日历</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#l-progress {
  height: 0.15rem;

  .bar,
  .track {
    height: 100%;
    background: var(--l-theme-color);
  }

  .bar.bar-active {
    width: 3rem;
  }

  .track.track-active {
    animation: track-active-animation 4s infinite ease-in;
  }

  @keyframes track-active-animation {
    @for $i from 0 to 25 {
      #{$i * 4%} {
        left: $i * 4vw;
      }
    }
  }

  .bar.static {
    width: 0;
  }

  .track.static {
    left: 0;
  }
}

code {
  margin: 0;
  --uno: rd-2 text-4;
  letter-spacing: 1.5px;
  color: var(--el-color-danger-light-3);
  font-family: v-bind(codeFontFamily);

  span {
    line-height: 1.8;
    font-family: v-bind(codeFontFamily);
  }
}
</style>

<style scoped lang="scss">
.l-background {
  background-image: url("/94471721_p0.jpg");
  background-size: 40% auto;
  background-repeat: repeat;
}

.l-menu {
  .static-menu {
    background-color: var(--l-theme-color);
    color: white;
  }

  .active-menu {
    background-color: white;
    color: var(--l-theme-color);
  }

  .close-menu-body {
    left: -17.5rem;

    .menu-list > div {
      opacity: 0;
    }
  }

  .open-menu-body {
    left: 0;

    @for $i from 0 to 10 {
      .menu-list > div:nth-child(#{$i}) {
        opacity: 1;
        transition-delay: #{$i * 0.06}s !important;
      }
    }
  }
}
</style>
