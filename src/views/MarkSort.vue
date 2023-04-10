<script setup lang="ts">
import { getWritingMark } from "@/apis/remote-api";

EcyUtils.startLoading();

const route = useRoute();
const router = useRouter();
const listing = shallowRef(await getWritingMark(`${route.params.tag}`));
const setting = EcyUtils.getSetting();

document.querySelector("title").innerText = `${listing.value.hint} - ${EcyConfig.blogApp} - 博客园`;

watch(route, async () => {
  if (route.name === "MarkSort") {
    EcyUtils.startLoading();
    listing.value = await getWritingMark(`${route.params.tag}`);
    document.querySelector("title").innerText = `${listing.value.hint} - ${EcyConfig.blogApp} - 博客园`;
    EcyUtils.endLoading();
  }
});

onMounted(() => {
  EcyUtils.endLoading();
});
</script>

<template>
  <div id="l-tagcoll" class="min-height z-9 page">
    <div class="content">
      <el-page-header :icon="null" @back="EcyUtils.Router.go({ path: 'back', router })">
        <template #title>
          <div class="f-c-c">
            <i-ep-back />
          </div>
        </template>
        <template #content>
          <div class="l-sec-size mb-5 mt-4">{{ listing.hint }}</div>
        </template>
      </el-page-header>
      <div class="relative mb-10" v-for="item of listing.data">
        <div class="l-sec-size">
          <router-link class="hover" :to="'/p/' + item.id">
            {{ item.text }}
          </router-link>
        </div>
        <div class="f-c-s l-fiv-size mt-6">
          <i-ep-caret-right />
          <router-link class="hover ml-0.5 b-b-1 b-b-dotted p-b-0.3" :to="'/p/' + item.id"> 阅读全文 </router-link>
        </div>
        <div class="works-synopsis mt-6 f-c-s l-fiv-size l-sec-color">
          <div class="mr-3 f-c-c">
            <i-ep-clock class="mr-1" />
            {{ item.date }}
          </div>
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
      </div>
    </div>
  </div>
</template>
