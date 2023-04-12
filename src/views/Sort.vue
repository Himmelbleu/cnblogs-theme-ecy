<script setup lang="ts">
import { getWritingSort, getWritingSortChild } from "@/apis/remote-api";

const route = useRoute();
const router = useRouter();
let id = route.params.id;
let mode = route.params.mode;
const child = shallowRef();
const sort = shallowRef();

async function fetchData(index?: number) {
  EcyUtils.startLoading();
  sort.value = await getWritingSort(`${id}`, index || 1);
  if (mode === "a") {
    child.value = await getWritingSortChild(`${id}`, "2");
  } else if (mode === "p") {
    child.value = await getWritingSortChild(`${id}`);
  }
  EcyUtils.setTitle(sort.value.hint);
  EcyUtils.endLoading();
}

await fetchData();

async function nexpr(e: any) {
  await fetchData(e.currentIndex);
}

async function next(e: any) {
  await fetchData(e.currentIndex);
}

async function prev(e: any) {
  await fetchData(e.currentIndex);
}

watch(route, async () => {
  if (route.name === "Sort") {
    id = route.params.id;
    mode = route.params.mode;
    await fetchData();
  }
});
</script>

<template>
  <div id="l-sort" class="min-height page">
    <div class="content">
      <Pagination @nexpr="nexpr" @next="next" @prev="prev" :count="sort.page">
        <template #content>
          <el-page-header :icon="null" @back="EcyUtils.Router.go({ path: 'back', router })">
            <template #title>
              <div class="f-c-c">
                <i-ep-back />
              </div>
            </template>
            <template #content>
              <div class="l-sec-size mb-5 mt-4">{{ sort.hint }}</div>
            </template>
          </el-page-header>
          <div class="l-sort__desc mb-4 l-for-size l-sec-color" v-html="sort.desc2 || sort.desc"></div>
          <div class="l-sort__child l-fiv-size" v-if="child.length > 0">
            <div class="hover f-c-s" v-for="(item, index) in child" :class="{ 'mb-4': index != child.length - 1 }">
              <span class="mr-2">-</span>
              <router-link :to="'/sort/p/' + item.id">{{ item.text }}</router-link>
            </div>
          </div>
          <WorksItem :data="sort.data" />
        </template>
      </Pagination>
    </div>
  </div>
</template>
