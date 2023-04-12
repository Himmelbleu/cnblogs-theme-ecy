<script setup lang="ts">
import { getWorksArchive, getDayArchive } from "@/apis/remote-api";

EcyUtils.startLoading();

const route = useRoute();
const router = useRouter();
let archiveDate = route.params.date;
let archiveMode = route.params.mode;
const worksArchive = shallowRef();

async function fetchData() {
  EcyUtils.startLoading();
  if (archiveMode === "a") {
    worksArchive.value = await getWorksArchive(`${archiveDate}`, "article");
  } else if (archiveMode === "p") {
    worksArchive.value = await getWorksArchive(`${archiveDate}`, "essay");
  } else if (archiveMode === "d") {
    worksArchive.value = await getDayArchive(`${String(archiveDate).replaceAll("-", "/")}`);
  }
  EcyUtils.setTitle(worksArchive.value.hint);
  EcyUtils.endLoading();
}

await fetchData();

watch(route, async () => {
  if (route.name === "Archive") {
    archiveMode = route.params.mode;
    archiveDate = route.params.date;
    await fetchData();
  }
});
</script>

<template>
  <div id="l-archive" class="min-height page">
    <div class="content">
      <Pagination @nexpr="fetchData" @next="fetchData" @prev="fetchData" :count="worksArchive.page">
        <template #content>
          <el-page-header :icon="null" @back="EcyUtils.Router.go({ path: 'back', router })">
            <template #title>
              <div class="f-c-c">
                <i-ep-back />
              </div>
            </template>
            <template #content>
              <div class="l-sec-size mb-5 mt-4">{{ worksArchive.hint }}</div>
            </template>
          </el-page-header>
          <WorksItem v-if="worksArchive.data.length > 0" :data="worksArchive.data" />
        </template>
      </Pagination>
    </div>
  </div>
</template>
