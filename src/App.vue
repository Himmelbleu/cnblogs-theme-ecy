<script setup lang="ts">
const isActiveMenu = ref(false);
const disabled = ref(!BleuVars.isPcDevice());

provide(ProvideKey.Katalog, disabled);
</script>

<template>
  <!-- 进度条 -->
  <div id="l-progress" class="z-9999 fixed left-0 top-0 w-100vw">
    <div class="track absolute top-0">
      <div class="bar rd-2"></div>
    </div>
  </div>
  <!-- 主要内容 -->
  <div id="l-content" class="fade-in-out relative z-9" @click="isActiveMenu = false">
    <div id="l-top-nail"></div>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive
          :include="[RouterName.BleuHome, RouterName.MarkList, RouterName.ArbeitenByCalendar]">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
    <div id="l-bottom-nail"></div>
  </div>
  <!-- 工具箱 -->
  <ToolKits />
  <!-- 背景 -->
  <div
    class="l-background fixed top-0 left-0 w-100vw h-100vh"
    :style="{
      'background-image': 'url(' + BleuVars.config.images.bg.src + ')',
      opacity: BleuVars.config.images.bg.opacity
    }"></div>
  <!-- github -->
  <div v-show="!isActiveMenu" class="l-github fixed left-0 bottom-0 z-9" m="l-2">
    <div class="f-c-c flex-col">
      <div class="write-vertical-left font-art bounce" m="b-4" text="4 b">
        {{ BleuVars.getBlogApp() }}'s Github
      </div>
      <div
        @click="Navigation.go({ path: 'www.github.com/himmelbleu' })"
        class="i-tabler-brand-github cursor-pointer"
        text="b 7"
        m="b-4"></div>
    </div>
  </div>
  <!-- 导航栏 -->
  <div class="l-menu">
    <div
      @click="isActiveMenu = !isActiveMenu"
      class="transition-all-300 select-none cursor-pointer f-c-c w-20 h-20 fixed top-0 z-99"
      :class="{
        'static-menu left--16 hover:left-0': !isActiveMenu,
        'active-menu left-0': isActiveMenu
      }"
      b="rd-rb-4">
      <div v-show="!isActiveMenu">
        <div class="i-tabler-menu2 text-10"></div>
        <div text="center 1" class="font-art">菜单</div>
      </div>
      <div v-show="isActiveMenu">
        <div text="15" class="i-tabler-x cursor-pointer" />
      </div>
    </div>
    <div
      class="menu-body transition-all-300 fixed top-0 left-0 w-70 h-100vh z-90 bg-drop-primary"
      :class="{ 'close-menu-body': !isActiveMenu, 'open-menu-body': isActiveMenu }">
      <div class="relative f-c-s flow-hidden h-100%">
        <div class="menu-list ml-10 text-1.2rem">
          <div class="hover mb-10 font-art" @click="Broswer.scrollIntoView('#tags-nail')">
            我的标签
          </div>
          <div class="hover mb-10 font-art" @click="Broswer.scrollIntoView('#essay-nail')">
            随笔分类
          </div>
          <div class="hover mb-10 font-art" @click="Broswer.scrollIntoView('#article-nail')">
            文章分类
          </div>
          <div class="hover mb-10 font-art" @click="Broswer.scrollIntoView('#essay-archive-nail')">
            随笔归档
          </div>
          <div
            class="hover mb-10 font-art"
            @click="Broswer.scrollIntoView('#article-archive-nail')">
            文章归档
          </div>
          <div class="hover mb-10 font-art" @click="Broswer.scrollIntoView('#my-pohoto-nail')">
            我的相册
          </div>
          <div class="hover mb-10 font-art" @click="Broswer.scrollIntoView('#recent-essay-nail')">
            最新随笔
          </div>
          <div class="hover font-art" @click="Broswer.scrollIntoView('#recent-comms-nail')">
            最新评论
          </div>
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
</style>

<style scoped lang="scss">
.l-background {
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
