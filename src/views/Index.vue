<script setup lang="ts">
import { getHomeWritingList } from "@/apis/remote-api";

EcyUtils.startLoading();

const listing = shallowRef(await getHomeWritingList(1));

async function fetchData(e: any) {
  EcyUtils.startLoading();
  listing.value = await getHomeWritingList(e.currentIndex);
  EcyUtils.endLoading();
}

function moveToStartNail() {
  document.querySelector("#l-start-nail").scrollIntoView();
}

const imgs = EcyConfig.__ECY_CONFIG__.covers.index || [
  "https://ts1.cn.mm.bing.net/th/id/R-C.4badb6d27851e519a24790386aef6461?rik=uUXkfL%2fVF6UAGg&riu=http%3a%2f%2fimg.mm4000.com%2ffile%2f4%2f31%2f603a19da02.jpg&ehk=Bxq7oNn5fHirjNU9QApEzGfPFIS7%2fchUXN1hFaEhvY0%3d&risl=&pid=ImgRaw&r=0",
  "https://img.tt98.com/d/file/tt98/201909171800581/001.jpg"
];

function randomSurface() {
  return imgs[Math.floor(Math.random() * imgs.length)];
}

onMounted(() => {
  EcyUtils.endLoading();
});
</script>

<template>
  <div class="welcome relative h-100vh w-100vw">
    <div class="z-999 absolute top-0 left-0 h-100% w-100% f-c-c">
      <div class="absolute bottom-10vh left-0 f-c-c w-100vw">
        <div class="w-10 h-10 hover" @click="moveToStartNail">
          <i-ep-arrow-down-bold class="arrow color-#ededed size-1.5rem hover" />
        </div>
      </div>
    </div>
    <div class="z-999 absolute bottom-0 left-0 h-75px w-100%">
      <div class="wave-1 absolute h-100% w-200%"></div>
      <div class="wave-2 absolute h-100% w-200%"></div>
    </div>
    <div class="z-990 cover absolute left-0 top-0 h-100% w-100%">
      <img class="relative h-100% w-100% rd-0" :src="randomSurface()" />
    </div>
  </div>
  <div id="l-start-nail"></div>
  <div id="l-index" class="page">
    <div class="content">
      <Pagination @prev="fetchData" @next="fetchData" @nexpr="fetchData" :count="listing.page">
        <template #content>
          <WorksItem v-if="listing.data.length > 0" :data="listing.data" />
        </template>
      </Pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
.welcome {
  div {
    font-family: #{"Amutham", var(--font-family)};
  }

  .cover::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px);
  }

  .wave-1 {
    top: 0;
    left: -100%;
    opacity: 0.5;
    animation: move-wave-to-right 20s infinite linear;
    background: url(https://images.cnblogs.com/cnblogs_com/blogs/666252/galleries/2281365/o_230410092356_wave-1.png) repeat-x;
  }

  .wave-2 {
    top: 0;
    left: 0%;
    opacity: 0.6;
    animation: move-wave-to-left 30s infinite linear;
    background: url(https://images.cnblogs.com/cnblogs_com/blogs/666252/galleries/2281365/o_230410092402_wave-2.png) repeat-x;
  }

  @keyframes move-wave-to-right {
    0% {
      transform: translateX(0%) scaleY(1);
    }
    50% {
      transform: translateX(25%) scaleY(0.85);
    }
    100% {
      transform: translateX(50%) scaleY(1);
    }
  }

  @keyframes move-wave-to-left {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-50%);
    }
  }

  .arrow {
    animation: move-arrow 1s infinite linear alternate;
  }

  @keyframes move-arrow {
    0% {
      transform: translateY(0%) scaleY(1);
    }
    50% {
      transform: translateY(10%) scaleY(0.85);
    }
    100% {
      transform: translateY(20%) scaleY(1);
    }
  }
}
</style>
