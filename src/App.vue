<script setup lang="ts">
const catalogDisabled = ref(!EcyVars.pcDevice);
const fontFamily = EcyVars.config.font.code || `var(--el-font-family)`;

provide(ProvideKey.CATALOG_DISABLED, catalogDisabled);

onMounted(() => {});

const isActiveMenu = ref(false);
</script>

<template>
  <div id="l-progress" class="z-9999 fixed left-0 top-0 w-100vw">
    <div class="track absolute top-0">
      <div class="bar rd-2"></div>
    </div>
  </div>
  <div id="l-content" class="fade-in-out relative">
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
  <div class="l-menu" :class="{ open: isActiveMenu }">
    <div
      @click="isActiveMenu = !isActiveMenu"
      :class="{ 'static-menu': !isActiveMenu, 'active-menu': isActiveMenu }"
      class="menu-button"
      select-none
      f-c-c
      w-25
      h-25
      fixed
      top-0
      z-1
      left-0
      b="rd-rb-5">
      <div v-show="!isActiveMenu">
        <i-ep-fold size-3 cursor-pointer />
        <div>MENU</div>
      </div>
      <div v-show="isActiveMenu">
        <i-ep-close size-4 cursor-pointer />
      </div>
    </div>
    <div class="menu-body" :class="{ 'close-menu-body': !isActiveMenu, 'open-menu-body': isActiveMenu }" fixed top-0 left-0 w-70 h-100vh>
      <div relative class="menu-list" mt-40 ml-7 font-bold>
        <div class="hover" mb-10>标签分类</div>
        <div class="hover" mb-10>随笔分类</div>
        <div class="hover" mb-10>随笔档案</div>
        <div class="hover" mb-10>文章分类</div>
        <div class="hover" mb-10>文章档案</div>
        <div class="hover" mb-10>最新随笔</div>
        <div class="hover" mb-10>最新评论</div>
        <div class="hover" mb-10>我的相册</div>
        <div class="hover">博客日历</div>
        <img
          z--1
          absolute
          left-0
          top-0
          class="w-100% h-100% object-cover"
          src="https://images-1303923190.cos.ap-chengdu.myqcloud.com/top_header_menu_bg.png"
          opacity-20 />
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

.l-menu {
  .menu-button {
    transition-delay: 0s;
    transition-property: background-color;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;
  }

  .static-menu {
    background-color: var(--l-theme-color);
    color: white;
  }

  .active-menu {
    background-color: white;
    color: var(--l-theme-color);
  }

  .menu-body {
    transition-delay: 0s;
    transition-property: left;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;
  }

  .close-menu-body {
    left: -17.5rem;

    .menu-list {
      & > div {
        opacity: 0;
        transition-property: all;
        transition-timing-function: ease-in-out;
      }
    }
  }

  .open-menu-body {
    left: 0;

    .menu-list {
      @for $i from 0 to 10 {
        & > div:nth-child(#{$i}) {
          opacity: 1;
          transition-delay: #{$i * 0.05}s !important;
        }
      }
    }
  }
}

code {
  margin: 0;
  --uno: rd-2 l-size-3;
  letter-spacing: 1.5px;
  color: var(--el-color-danger-light-3);
  font-family: v-bind(fontFamily);

  span {
    line-height: 1.8;
    font-family: v-bind(fontFamily);
  }
}
</style>
