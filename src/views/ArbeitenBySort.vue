<script setup lang="ts">
import { WorksApi } from "@/apis";
import { useLoading } from "@/hooks/comp-hooks";

const route = useRoute();
const typeL2Works = shallowRef();
const typeL1Works = shallowRef();
const worksImgs = BleuVars.config.images.works;
const imgsIndex = shallowRef();

async function fetchData(index?: any) {
  typeL1Works.value = await WorksApi.getByL1(`${route.params.id}`, index);
  typeL2Works.value = await WorksApi.getByL2(`${route.params.id}`, typeL1Works.value.isArticle);
  imgsIndex.value = Random.get(worksImgs, typeL1Works.value.data.length);
  Broswer.setTitle(typeL1Works.value.hint);
}

useLoading(fetchData);

watch(route, () => {
  if (route.name === RouterName.ArbeitenBySort) {
    useLoading(fetchData);
  }
});
</script>

<template>
  <div id="l-works-by-sort" class="page">
    <div class="content">
      <pagination
        @nexpr="fetchData"
        @next="fetchData"
        @prev="fetchData"
        :count="typeL1Works.page"
        :disabled="!typeL1Works.data.length">
        <template #content>
          <el-page-header :icon="null" @back="Navigation.go({ path: 'back', router: $router })">
            <template #title>
              <div class="f-c-c">
                <i-ep-back />
              </div>
            </template>
            <template #content>
              <div class="text-1.2rem mb-5 mt-4">{{ typeL1Works.hint }}</div>
            </template>
          </el-page-header>
          <div
            class="mb-10 text-0.9rem text-c"
            v-html="typeL1Works.desc2 || typeL1Works.desc"></div>
          <div class="text-0.9rem" v-if="typeL2Works.length > 0">
            <div
              class="hover f-c-s"
              v-for="(item, index) in typeL2Works"
              :class="{ 'mb-3': index != typeL2Works.length - 1 }">
              <span class="mr-2">📁</span>
              <router-link :to="RouterPath.ArbeitenBySort(item.id)">{{ item.text }}</router-link>
            </div>
          </div>
          <ArbeitenItem
            v-if="typeL1Works.data.length > 0"
            v-for="(item, index) in typeL1Works.data"
            :key="item.id"
            :item="item"
            :index="index"
            :cover="worksImgs[imgsIndex[index]]" />
        </template>
      </pagination>
      <div class="mt-35" v-if="!typeL1Works.data.length">
        <el-result title="没有随笔" sub-title="该分类没有随笔，请点击查看子分类"> </el-result>
      </div>
    </div>
  </div>
</template>
