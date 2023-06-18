<script setup lang="ts">
const disabled = ref(!BleuVars.isPcDevice());

provide(ProvideKey.Katalog, disabled);

onMounted(() => {});
</script>

<template>
  <!-- 进度条 -->
  <div id="l-progress" class="z-9999 fixed-lt w-100vw">
    <div class="track absolute top-0">
      <div class="bar rd-2"></div>
    </div>
  </div>
  <!-- 主要内容 -->
  <div id="l-content" class="fade-in-out relative z-9">
    <div id="l-top-nail"></div>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive
          :include="[
            RouterName.BleuHome,
            RouterName.MarkList,
            RouterName.ArbeitenByCalendar,
            RouterName.ArbeitenList
          ]">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
    <div id="l-bottom-nail"></div>
  </div>
  <ToolKits />
  <div
    class="fixed-lt w-100vw h-100vh"
    :style="{
      'background-image': 'url(' + BleuVars.config.images.bg.src + ')',
      'background-size': BleuVars.config.images.bg.size || '50 auto',
      'background-repeat': BleuVars.config.images.bg.repeat || 'repeat',
      opacity: BleuVars.config.images.bg.opacity || 0.03
    }"></div>
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
