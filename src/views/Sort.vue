<script setup lang="ts">
import { getWorksSort, getWorksSortChild } from "@/apis/remote-api";

const route = useRoute();
const router = useRouter();
let sortId = route.params.id;
let sortMode = route.params.mode;
const sortChild = shallowRef();
const worksSort = shallowRef();

async function fetchData(page?: any) {
  EcyUtils.startLoading();
  worksSort.value = await getWorksSort(`${sortId}`, page?.currentIndex || 1);
  if (sortMode === "a") {
    sortChild.value = await getWorksSortChild(`${sortId}`, "2");
  } else if (sortMode === "p") {
    sortChild.value = await getWorksSortChild(`${sortId}`);
  }
  EcyUtils.setTitle(worksSort.value.hint);
  EcyUtils.endLoading();
}

await fetchData();

watch(route, async () => {
  if (route.name === "Sort") {
    sortId = route.params.id;
    sortMode = route.params.mode;
    await fetchData();
  }
});
</script>

<template>
  <div id="l-sort" class="min-height page">
    <div class="content">
      <Pagination @nexpr="fetchData" @next="fetchData" @prev="fetchData" :count="worksSort.page">
        <template #content>
          <el-page-header :icon="null" @back="EcyUtils.Router.go({ path: 'back', router })">
            <template #title>
              <div class="f-c-c">
                <i-ep-back />
              </div>
            </template>
            <template #content>
              <div class="l-sec-size mb-5 mt-4">{{ worksSort.hint }}</div>
            </template>
          </el-page-header>
          <div class="l-sort__desc mb-4 l-for-size l-sec-color" v-html="worksSort.desc2 || worksSort.desc"></div>
          <div class="l-sort__child l-fiv-size" v-if="sortChild.length > 0">
            <div class="hover f-c-s" v-for="(item, index) in sortChild" :class="{ 'mb-4': index != sortChild.length - 1 }">
              <span class="mr-2">-</span>
              <router-link :to="'/sort/p/' + item.id">{{ item.text }}</router-link>
            </div>
          </div>
          <WorksItem :data="worksSort.data" />
        </template>
      </Pagination>
    </div>
  </div>
</template>
