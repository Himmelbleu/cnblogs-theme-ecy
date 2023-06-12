<script setup lang="ts">
import { WorksApi } from "@/apis";
import { useLoading } from "@/hooks/comp-hooks";

const route = useRoute();
let archiveDate = route.params.date;
let archiveMode = route.params.mode;
const archiveWorks = shallowRef();
const worksImgs = EcyVars.config.images.works;
const imgsIndex = shallowRef();

async function fetchData() {
  let fetchDataPromise;

  if (archiveMode == "a") {
    fetchDataPromise = WorksApi.getListByArchive(`${archiveDate}`, "article");
  } else if (archiveMode == "p") {
    fetchDataPromise = WorksApi.getListByArchive(`${archiveDate}`, "works");
  } else {
    fetchDataPromise = WorksApi.getListByDay(`${String(archiveDate).replaceAll("-", "/")}`);
  }

  archiveWorks.value = await fetchDataPromise;
  imgsIndex.value = Random.get(worksImgs, archiveWorks.value.data.length);
  Broswer.setTitle(archiveWorks.value.hint);
}

useLoading(fetchData);

watch(route, () => {
  if (route.name === RouterName.WORKS_BY_ARCHIVE) {
    archiveMode = route.params.mode;
    archiveDate = route.params.date;
    useLoading(fetchData);
  }
});
</script>

<template>
  <div id="l-works-by-archive" class="page">
    <div class="content" v-if="archiveWorks">
      <pagination @nexpr="fetchData" @next="fetchData" @prev="fetchData" :count="archiveWorks.page">
        <template #content>
          <el-page-header :icon="null" @back="Navigation.go({ path: 'back', router: $router })">
            <template #title>
              <div class="f-c-c">
                <i-ep-back />
              </div>
            </template>
            <template #content>
              <div class="text-1.2rem mb-5 mt-4">{{ archiveWorks.hint }}</div>
            </template>
          </el-page-header>
          <WorksItem
            v-if="archiveWorks.data.length > 0"
            v-for="(item, index) in archiveWorks.data"
            :key="item.id"
            :item="item"
            :index="index"
            :cover="worksImgs[imgsIndex[index]]" />
        </template>
      </pagination>
    </div>
  </div>
</template>
