<script setup lang="ts">
import { getWritingArchive, getDayArchive } from "@/apis/remote-api";

EcyUtils.startLoading();

const route = useRoute();
const router = useRouter();
let date = route.params.date;
let mode = route.params.mode;
const archive = shallowRef();

async function fetchData() {
  EcyUtils.startLoading();
  if (mode === "a") {
    archive.value = await getWritingArchive(`${date}`, "article");
  } else if (mode === "p") {
    archive.value = await getWritingArchive(`${date}`, "essay");
  } else if (mode === "d") {
    archive.value = await getDayArchive(`${String(date).replaceAll("-", "/")}`);
  }
  EcyUtils.setTitle(archive.value.hint);
  EcyUtils.endLoading();
}

await fetchData();

async function nexpr(e: any) {
  // await fetchData();
}

async function next(e: any) {
  // await fetchData();
}

async function prev(e: any) {
  // await fetchData();
}

watch(route, async () => {
  if (route.name === "Archive") {
    mode = route.params.mode;
    date = route.params.date;
    await fetchData();
  }
});
</script>

<template>
  <div id="l-archive" class="min-height page">
    <div class="content">
      <Pagination @nexpr="nexpr" @next="next" @prev="prev" :count="archive.page">
        <template #content>
          <el-page-header :icon="null" @back="EcyUtils.Router.go({ path: 'back', router })">
            <template #title>
              <div class="f-c-c">
                <i-ep-back />
              </div>
            </template>
            <template #content>
              <div class="l-sec-size mb-5 mt-4">{{ archive.hint }}</div>
            </template>
          </el-page-header>
          <WorksItem v-if="archive.data.length > 0" :data="archive.data" />
        </template>
      </Pagination>
    </div>
  </div>
</template>
