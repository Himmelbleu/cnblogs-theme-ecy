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

onMounted(() => {
  EcyUtils.endLoading();
});
</script>

<template>
  <div id="l-cover" class="relative h-100vh w-100vw">
    <div class="z-999 absolute top-0 left-0 h-100% w-100% f-c-c">
      <div>
        <div class="color-white size-2.5rem text-center">Welcome to {{ EcyConfig.blogApp }}'s blog.</div>
        <div class="color-white size-1.2rem text-center mt-4">Time tick away, dream faded away!</div>
        <div class="absolute bottom-10vh left-0 f-c-c w-100vw">
          <div class="w-10 h-10 hover" @click="moveToStartNail">
            <i-ep-arrow-down-bold class="arrow color-white size-1.5rem hover" />
          </div>
        </div>
      </div>
    </div>
    <div class="wave z-999 absolute bottom-0 left-0 h-75px w-100%">
      <div class="wave-1 absolute h-100% w-200%"></div>
      <div class="wave-2 absolute h-100% w-200%"></div>
    </div>
    <div class="cover z-99 absolute left-0 top-0 h-100% w-100%">
      <img
        class="z-9 h-100% w-100%"
        src="https://ts1.cn.mm.bing.net/th/id/R-C.a5cc371a8bcd320e5b82dd1e6f1b4507?rik=Hv3Y78fE8buapg&riu=http%3a%2f%2fpic.vjshi.com%2f2017-06-13%2ff5e5a32b81bd671095ba99e58f4c0c77%2f00002.jpg%3fx-oss-process%3dstyle%2fwatermark&ehk=hZfteTa0hie3%2bwnSaJNBCz4tdtmqHG6NUw8khyOUDC4%3d&risl=&pid=ImgRaw&r=0" />
    </div>
  </div>
  <div id="l-start-nail"></div>
  <div id="l-index" class="page">
    <div class="content">
      <Pagination @prev="fetchData" @next="fetchData" @nexpr="fetchData" :count="listing.page">
        <template #content>
          <WritingItem v-if="listing.data.length > 0" :data="listing.data" />
        </template>
      </Pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
#l-cover {
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
    backdrop-filter: blur(5px);
  }

  .wave-1 {
    top: 0;
    left: -100%;
    opacity: 0.5;
    animation: move-wave-to-right 20s infinite linear;
    background: url(https://images-1303923190.cos.ap-chengdu.myqcloud.com/wave-1.png) repeat-x;
  }

  .wave-2 {
    top: 0;
    left: 0%;
    opacity: 0.6;
    animation: move-wave-to-left 30s infinite linear;
    background: url(https://images-1303923190.cos.ap-chengdu.myqcloud.com/wave-2.png) repeat-x;
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
