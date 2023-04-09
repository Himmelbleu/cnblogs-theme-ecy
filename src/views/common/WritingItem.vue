<script setup lang="ts">
defineProps({
  data: {
    type: Array as PropType<CustType.IWriting[]>,
    required: true
  }
});

const imgs = EcyConfig.__ECY_CONFIG__.covers || [
  "https://ts1.cn.mm.bing.net/th/id/R-C.4badb6d27851e519a24790386aef6461?rik=uUXkfL%2fVF6UAGg&riu=http%3a%2f%2fimg.mm4000.com%2ffile%2f4%2f31%2f603a19da02.jpg&ehk=Bxq7oNn5fHirjNU9QApEzGfPFIS7%2fchUXN1hFaEhvY0%3d&risl=&pid=ImgRaw&r=0",
  "https://ts1.cn.mm.bing.net/th/id/R-C.014f24d6b88fd514e2b1af258d8a81d5?rik=6wL2a8nnVycIPw&riu=http%3a%2f%2fimgs.aixifan.com%2flive%2f1483601927981%2f1483601927981.jpg&ehk=WU5Hx0ObWJViv5UnNB9nVGQTxxocVpGrOKKzvJATbyk%3d&risl=&pid=ImgRaw&r=0",
  "https://img.tt98.com/d/file/tt98/201909171800581/001.jpg"
];

function randomSurface() {
  return imgs[Math.floor(Math.random() * imgs.length)];
}

const router = useRouter();
</script>

<template>
  <div class="f-c-b item h-20rem rd-2" v-for="(item, index) in data">
    <img v-if="index % 2 !== 0" class="w-45% h-100%" :src="item.surface || randomSurface()" />
    <div class="w-52%" :class="{ 'pl-4': index % 2 === 0, 'pr-4': index % 2 !== 0 }">
      <div class="hover text-ellipsis line-clamp-2 f-c-s mb-6 l-pri-size" @click="EcyUtils.Router.go({ path: '/p/' + item.id, router })">
        {{ item.text }}
      </div>
      <div class="f-c-s mb-4 l-fiv-size l-sec-color">
        <div class="mr-3 f-c-c">
          <i-ep-view class="mr-1" />
          {{ item.view }}
        </div>
        <div class="mr-3 f-c-c">
          <i-ep-chat-line-square class="mr-1" />
          {{ item.comm }}
        </div>
        <div class="f-c-c">
          <i-ep-star class="mr-1" />
          {{ item.digg }}
        </div>
      </div>
      <div class="l-thr-color text-ellipsis line-clamp-4">
        {{ item.desc }}
      </div>
      <div class="hover f-c-s mt-6 l-fiv-size">
        <i-ep-caret-right />
        <router-link class="ml-0.5 b-b-1 b-b-dotted p-b-0.3" :to="'/p/' + item.id"> 阅读全文 </router-link>
      </div>
      <div class="mt-4" :class="{ 'f-c-s': index % 2 === 0, 'f-c-e': index % 2 !== 0 }">
        <div class="l-fiv-size l-sec-color f-c-c">
          <i-ep-clock class="mr-1" />
          {{ item.date }}
        </div>
      </div>
      <div :class="{ 'mt-4': item.isTop || item.isOnlyMe || item.isLocked }">
        <LTag round plain v-if="item.isTop" class="mr-2">置顶随笔</LTag>
        <LTag round plain v-else-if="item.isOnlyMe" class="mr-2">自己可见</LTag>
        <LTag round plain v-else-if="item.isLocked" class="mr-2">密码锁定</LTag>
      </div>
    </div>
    <img v-if="index % 2 === 0" class="w-45% h-100%" :src="item.surface || randomSurface()" />
  </div>
</template>

<style scoped lang="scss">
.item {
  transition: var(--l-transition);
  margin: {
    top: 1.5rem;
    bottom: 3rem;
  }
  box-shadow: 0 1px 20px -6px rgba(85, 85, 85, 0.5);
}

.item:hover {
  box-shadow: 0 1px 20px -6px rgba(193, 193, 193, 0.5);
}
</style>
