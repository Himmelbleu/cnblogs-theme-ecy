<script setup lang="ts">
import { useBaseAuthorData } from "@/store";
import { getMasterData, getAuthorData } from "@/apis/remote-api";

const route = useRoute();
const ldisabled = ref(true);
const rdisabled = ref(true);
const setting = EcyUtils.getSetting();
const { setBaseAuthorData } = useBaseAuthorData();

getAuthorData().then(author => {
  getMasterData().then(master => {
    setBaseAuthorData({ author, master });
  });
});

onMounted(() => {
  document.getElementById("l-lstrip").onclick = () => {
    ldisabled.value = !ldisabled.value;
  };

  document.getElementById("l-rstrip").onclick = () => {
    rdisabled.value = !rdisabled.value;
  };

  document.getElementById("l-matte").onclick = () => {
    if (!ldisabled.value) ldisabled.value = true;
    else if (!rdisabled.value) rdisabled.value = true;
  };
});

const imgs = EcyConfig.__ECY_CONFIG__.covers.app || [
  "https://ts1.cn.mm.bing.net/th/id/R-C.4badb6d27851e519a24790386aef6461?rik=uUXkfL%2fVF6UAGg&riu=http%3a%2f%2fimg.mm4000.com%2ffile%2f4%2f31%2f603a19da02.jpg&ehk=Bxq7oNn5fHirjNU9QApEzGfPFIS7%2fchUXN1hFaEhvY0%3d&risl=&pid=ImgRaw&r=0",
  "https://img.tt98.com/d/file/tt98/201909171800581/001.jpg"
];

function randomSurface() {
  return imgs[Math.floor(Math.random() * imgs.length)];
}

watch(route, async () => {
  if (route.name === "Index" || route.name === "EssayList") {
    document.querySelector("title").innerText = `${EcyConfig.blogApp} - 博客园`;
  }
});
</script>

<template>
  <div class="l-tools">
    <div id="l-progress" class="z-99999 fixed left-0 top-0 w-100vw">
      <div class="l-pro__track absolute top-0">
        <div class="l-pro__bar rd-2"></div>
      </div>
    </div>
    <div id="l-matte" class="fixed z-99 top-0 left-0 z-3 l-matee-bg" :class="{ 'w-100% h-100vh': !rdisabled || !ldisabled }"></div>
    <ToolKits />
    <GitHub />
    <div id="l-background" class="fixed left-0 top-0 w-100vw h-100vh">
      <div class="w-100% h-100% relative">
        <div class="opacity-96 absolute left-0 top-0 w-100% h-100% bg-#191919"></div>
        <img class="w-100% h-100% rd-0" :src="randomSurface()" />
      </div>
    </div>
    <div
      id="l-lstrip"
      v-show="!setting.cabinet.left.pin"
      class="z-99 fixed left-0 top-47.5vh w-5px h-5vh rd-2 cursor-pointer opacity-70 l-strip-bg"></div>
    <Suspense>
      <LeftCabinet :disabled="ldisabled" />
    </Suspense>
    <div
      id="l-rstrip"
      v-show="!setting.cabinet.right.pin"
      class="z-99 fixed right-0 top-47.5vh w-5px h-5vh rd-2 cursor-pointer opacity-70 l-strip-bg"></div>
    <RightCabinet :disabled="rdisabled" />
  </div>
  <div id="l-content" class="l-transition">
    <div id="l-top-nail"></div>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive :include="['Home', 'MarkList', 'Index', 'Calendar']">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
    <div id="l-bottom-nail"></div>
  </div>
</template>

<style lang="scss">
#l-progress {
  height: 0.15rem;

  .l-pro__bar,
  .l-pro__track {
    height: 100%;
    background: var(--l-theme-color);
  }

  .l-pro__bar.bar-active {
    animation: active-animation 3s infinite ease-in-out;
    width: 3rem;
  }

  .l-pro__track.track-active {
    animation: track-active-animation 4s infinite ease-in;
  }

  @keyframes active-animation {
    @for $index from 0 to 10 {
      #{$index * 10%} {
        width: 3rem + $index * 0.2rem;
      }
    }
  }

  @keyframes track-active-animation {
    @for $index from 0 to 25 {
      #{$index * 4%} {
        left: $index * 4vw;
      }
    }
  }

  .l-pro__bar.static {
    width: 0vw;
  }

  .l-pro__track.static {
    left: 0;
  }
}
</style>

<style scoped lang="scss">
.l-transition {
  animation: transition-animation 0.5s ease-in;

  @keyframes transition-animation {
    @for $index from 0 to 10 {
      #{$index * 10%} {
        opacity: math.div($index, 10);
      }
    }
  }
}
</style>
