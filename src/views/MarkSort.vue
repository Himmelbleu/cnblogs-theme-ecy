<script setup lang="ts">
import { getWorksMark } from "@/apis";

EcyUtils.startLoading();

const route = useRoute();
const router = useRouter();
const worksMark = shallowRef(await getWorksMark(`${route.params.tag}`));
EcyUtils.setTitle(worksMark.value.hint);

async function fetchData(index?: any) {
  EcyUtils.startLoading();
  worksMark.value = await getWorksMark(`${route.params.tag}`, index);
  EcyUtils.setTitle(worksMark.value.hint);
  EcyUtils.endLoading();
}

watch(route, async () => {
  if (route.name === "MarkSort") await fetchData();
});

onMounted(() => {
  EcyUtils.endLoading();
});
</script>

<template>
  <div id="l-tagcoll" class="min-height page">
    <div class="content">
      <el-page-header :icon="null" @back="EcyUtils.Router.go({ path: 'back', router })">
        <template #title>
          <div class="f-c-c">
            <i-ep-back />
          </div>
        </template>
        <template #content>
          <div class="l-sec-size mb-5 mt-4">{{ worksMark.hint }}</div>
        </template>
      </el-page-header>
      <Pagination @nexpr="fetchData" @next="fetchData" @prev="fetchData" :count="worksMark.page">
        <template #content>
          <div class="relative mb-10" v-for="item of worksMark.data">
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
        </template>
      </Pagination>
    </div>
  </div>
</template>
