<script setup lang="ts">
import { ArbeitenApi } from "@/apis";

const router = useRouter();
const route = useRoute();
const typeL1Arbeiten = shallowRef<BleuArbeitenList2>();
const typeL2Arbeiten = shallowRef<BleuArbeitenL2[]>();
const arbeitenCouverture = BleuVars.config.images?.arbeiten || [];
const couvertureIndexs = shallowRef<number[]>();
const loading = new Broswer.Loading();

const defaultIndex = ref(1);

async function fetchData(index: any) {
  loading.startLoading();
  const id = route.query.id;
  router.replace(RouterPath.ArbeitenBySort(`${id}`, index, false));
  const val1 = await ArbeitenApi.getByL1(`${id}`, index);
  const val2 = await ArbeitenApi.getByL2(`${id}`, val1.isArticle);

  typeL1Arbeiten.value = val1;
  typeL2Arbeiten.value = val2;

  couvertureIndexs.value = Random.get(arbeitenCouverture, typeL1Arbeiten.value.data.length);

  nextTick(() => {
    loading.endLoading();
    Broswer.setTitle(typeL1Arbeiten.value.hint);
  });
}

async function takeQueryToFetchData() {
  const page = route.query.page || 1;
  defaultIndex.value = Number(page);
  await fetchData(page);
}

await takeQueryToFetchData();

watch(route, async () => {
  if (route.name === RouterName.ArbeitenBySort) {
    await takeQueryToFetchData();
  }
});
</script>

<template>
  <div id="l-arbeiten-by-sort" class="page">
    <div class="content" v-if="typeL1Arbeiten">
      <Pagination
        :default-index="defaultIndex"
        @change="fetchData"
        @next="fetchData"
        @prev="fetchData"
        :count="typeL1Arbeiten.page"
        :disabled="!typeL1Arbeiten.data.length">
        <template #content>
          <el-page-header :icon="null" @back="$router.back()">
            <template #title>
              <div class="f-c-c">
                <i-ep-back />
              </div>
            </template>
            <template #content>
              <div class="text-1.2rem mb-5 mt-4">{{ typeL1Arbeiten.hint }}</div>
            </template>
          </el-page-header>
          <div
            class="mb-10 text-0.9rem text-c"
            v-html="typeL1Arbeiten.desc2 || typeL1Arbeiten.desc"></div>
          <div class="mb-10 text-0.9rem" v-if="typeL2Arbeiten?.length">
            <div
              class="hover f-c-s text-b"
              v-for="(item, index) in typeL2Arbeiten"
              :class="{ 'mb-3': index != typeL2Arbeiten.length - 1 }">
              <div class="i-tabler-folder-plus mr-2"></div>
              <router-link :to="RouterPath.ArbeitenBySort(item.id, '1', true)">{{
                item.text
              }}</router-link>
            </div>
          </div>
          <ArbeitenItem
            v-if="typeL1Arbeiten.data?.length"
            v-for="(item, index) in typeL1Arbeiten.data"
            :key="item.id"
            :item="item"
            :index="index"
            :length="typeL1Arbeiten.data.length"
            :cover="arbeitenCouverture[couvertureIndexs[index]]" />
        </template>
      </Pagination>
      <div class="mt-30" v-if="!typeL1Arbeiten?.data?.length">
        <el-result title="没有随笔" sub-title="该分类没有随笔，请点击查看子分类"> </el-result>
      </div>
    </div>
  </div>
</template>
