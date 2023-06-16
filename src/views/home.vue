<script setup lang="ts">
import { useLoading } from "@/hooks/comp-hooks";
import { WorksApi, MenuApi, getMarkList } from "@/apis";

const list = shallowRef();
const news = shallowRef();
const status = shallowRef();
const topList = shallowRef();
const column = shallowRef();
const markList = shallowRef();
const carouselList = shallowRef(EcyVars.config.images.home.carousel);

useLoading(async () => {
  const then = await Promise.all([
    WorksApi.getList(),
    MenuApi.getNews(),
    MenuApi.getStats(),
    MenuApi.getTopList(),
    MenuApi.getColumn(),
    getMarkList()
  ]);
  then[0].data.splice(3, 7);
  list.value = then[0];
  news.value = then[1];
  status.value = then[2];
  topList.value = then[3];
  column.value = then[4];
  markList.value = then[5];
});

const carouselIndex = ref(0);

setInterval(() => {
  carouselIndex.value++;
  if (carouselIndex.value > 3) {
    carouselIndex.value = 0;
  }
}, 5000);
</script>

<template>
  <div id="l-home">
    <!-- area-1：开屏 -->
    <div class="f-c-c">
      <div class="f-c-c w-80vw">
        <div p="x-30" class="h-100vh w-52% f-c-c">
          <div class="h-100%">
            <div m="t-5">
              <div text="start 10" class="shine-text font-art">
                {{ EcyVars.getBlogApp() }} 的博客
              </div>
              <div
                text="start 4 ellipsis"
                class="line-clamp-2 line-height-1.2 letter-spacing-0.1 font-art"
                m="t-3">
                Time tick away, dream faded away.
              </div>
            </div>
            <div m="t-14">
              <div m="b-7" v-if="list?.data" v-for="item in list.data">
                <div p="b-4">
                  <div class="f-c-s text-b" m="b-6">
                    <div class="i-tabler-clock-hour3 mr-2"></div>
                    {{ item.date }}
                  </div>
                  <div class="text-ellipsis line-clamp-2">
                    {{ item.text }}
                  </div>
                  <div class="f-c-e" text="0.8rem c" m="t-6">
                    <div
                      m="r-2"
                      text="b"
                      class="cursor-pointer hover"
                      @click="
                        Navigation.go({
                          path: RouterPath.WORKS(item.id),
                          router: $router
                        })
                      ">
                      阅读全文
                    </div>
                    <div class="f-c-e">
                      <div m="r-2" class="f-c-c">
                        <div class="i-tabler-message2" m="r-1"></div>
                        <div>
                          {{ item.comm }}
                        </div>
                      </div>
                      <div m="r-2" class="f-c-c">
                        <div class="i-tabler-brand-tinder" m="r-1"></div>
                        <div>
                          {{ item.digg }}
                        </div>
                      </div>
                      <div class="f-c-c">
                        <div class="i-tabler-eye" m="r-1"></div>
                        <div>
                          {{ item.view }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div text="end" class="f-c-e">
                <div
                  class="w-20 cursor-pointer hover:text-primary transition-all-300 font-art"
                  p="x-1 y-1"
                  text="center 0.8rem"
                  b="rd-4 solid 1 hover:primary">
                  MORE
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-52% h-100vh f-c-b">
          <div class="carousel w-87% relative h-100vh">
            <img
              v-for="(item, index) in carouselList"
              :class="carouselIndex == index ? 'opacity-100 z-99' : 'opacity-0 z-0'"
              class="w-100% h-100% absolute top-0 left-0 object-cover"
              :src="item" />
          </div>
          <div class="w-12% f-e-e h-100vh">
            <div class="mb-5">
              <div
                v-for="(item, index) in carouselList"
                class="f-c-c cursor-pointer"
                @mouseover="carouselIndex = index">
                <img
                  class="mt-5 w-18 h-18 rd-50 object-cover b-solid p-1 b-width-2.5"
                  :class="carouselIndex == index ? 'b-blue' : 'b-transparent'"
                  :src="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- area-2：基本信息展示 -->
    <div class="f-c-c mt-20">
      <div class="px-30 w-80vw">
        <div class="f-s-b">
          <div class="w-48%">
            <div class="caption">
              <div class="i-tabler-info-square-rounded mr-2"></div>
              博主数据
            </div>
            <div class="f-s-b mb-6">
              <div>
                <img class="w-25 h-25 rd-50" :src="EcyVars.config.avatar" />
              </div>
              <div v-if="column?.rankings?.length > 0" class="f-c-e">
                <div>
                  <div v-for="item in column.rankings" class="mt-4">
                    {{ item.text }}
                  </div>
                </div>
              </div>
            </div>
            <div class="f-s-b pr-30">
              <div v-if="news?.length > 0">
                <div class="text-1.1rem">
                  <div class="f-c-s">
                    <div class="i-tabler-user mr-2"></div>
                    博主：{{ news[0].text }}
                  </div>
                  <div class="f-c-s" m="t-5">
                    <div class="i-tabler-calendar mr-2"></div>
                    园龄：{{ news[1].text }}
                  </div>
                  <div class="f-c-s" m="t-5">
                    <div class="i-tabler-brand-twitch mr-2"></div>
                    粉丝：{{ news[2].text }}
                  </div>
                  <div class="f-c-s" m="t-5">
                    <div class="i-tabler-heart mr-2"></div>
                    关注：{{ news[3].text }}
                  </div>
                </div>
              </div>
              <div v-if="status?.length > 0">
                <div class="text-1.1rem">
                  <div class="f-c-s">
                    <div class="i-tabler-pencil-minus mr-2"></div>
                    发表的随笔：{{ status[0].digg }}
                  </div>
                  <div class="f-c-s" m="t-5">
                    <div class="i-tabler-books mr-2"></div>
                    发表的文章：{{ status[1].digg }}
                  </div>
                  <div class="f-c-s" m="t-5">
                    <div class="i-tabler-message-circle mr-2"></div>
                    拥有的评论：{{ status[2].digg }}
                  </div>
                  <div class="f-c-s" m="t-5">
                    <div class="i-tabler-chart-bar mr-2"></div>
                    被阅读：{{ status[3].digg }}次
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-48%">
            <div class="text-primary font-art text-1.4rem letter-spacing-0.2 f-c-s" m="b-5">
              <div class="i-tabler-chart-radar mr-2"></div>
              我的技能
            </div>
            <div class="f-c-c">
              <skill-graph />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- area-3：中间过渡图片 -->
    <div class="mt-20">
      <div class="divide-bg w-100vw h-80 relative">
        <img class="w-100% h-100% object-cover" :src="EcyVars.config.images.home.divider" />
      </div>
    </div>
    <!-- area-4：随笔标签 -->
    <div class="f-c-c font-main mt-20">
      <div class="px-30 w-80vw">
        <div id="tags-nail" class="caption">
          <div class="i-tabler-bookmarks mr-2"></div>
          我的标签
        </div>
        <div v-if="markList?.length > 0" class="f-c-b flex-wrap">
          <hollowed-box
            v-for="item in markList"
            line="dotted"
            hover
            round
            class="mr-4 mb-6"
            @click="Navigation.go({ path: RouterPath.WORKS_BY_MARK(item.text), router: $router })">
            {{ item.text }}({{ item.count }})
          </hollowed-box>
        </div>
      </div>
    </div>
    <!-- area-5：随笔分类 -->
    <div class="f-c-c font-main mt-15">
      <div class="px-30 w-80vw f-s-b">
        <div class="w-48%">
          <div id="essay-nail" class="caption">
            <div class="i-tabler-category-2 mr-2"></div>
            随笔分类
          </div>
          <div v-if="column?.essaySort?.length > 0" class="f-c-b flex-wrap">
            <div
              @click="Navigation.go({ path: RouterPath.WORKS_BY_SORT(item.id), router: $router })"
              class="mb-6 mr-4 cursor-pointer hover"
              v-for="item in column.essaySort">
              {{ item.text }}
            </div>
          </div>
        </div>
        <div class="w-48%">
          <div id="article-nail" class="caption">
            <div class="i-tabler-sort-a-z mr-2"></div>
            文章分类
          </div>
          <div v-if="column?.articleSort?.length > 0" class="f-c-b flex-wrap">
            <div
              @click="Navigation.go({ path: RouterPath.WORKS_BY_SORT(item.id), router: $router })"
              class="mb-6 mr-4 cursor-pointer hover"
              v-for="item in column.articleSort">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- area-6：随笔归档 -->
    <div class="f-c-c font-main mt-15">
      <div class="px-30 w-80vw">
        <div id="essay-archive-nail" class="caption">
          <div class="i-tabler-archive-filled mr-2"></div>
          随笔归档
        </div>
        <div v-if="column?.essayArchive?.length > 0" class="f-c-b flex-wrap">
          <div
            @click="
              Navigation.go({ path: RouterPath.WORKS_BY_ARCHIVE('p', item.id), router: $router })
            "
            class="mb-6 mr-4 cursor-pointer hover"
            v-for="item in column.essayArchive">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
    <!-- area-7：文章归档 -->
    <div class="f-c-c font-main mt-15">
      <div class="px-30 w-80vw">
        <div id="article-archive-nail" class="caption">
          <div class="i-tabler-folder-check mr-2"></div>
          文章归档
        </div>
        <div v-if="column?.articleArchive?.length > 0" class="f-c-b flex-wrap">
          <div
            @click="
              Navigation.go({ path: RouterPath.WORKS_BY_ARCHIVE('a', item.id), router: $router })
            "
            class="mb-6 mr-4 cursor-pointer hover"
            v-for="item in column.articleArchive">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
    <!-- area-8：相册列表 -->
    <div class="f-c-c font-main mt-15">
      <div class="px-30 w-80vw">
        <div id="my-pohoto-nail" class="caption">
          <div class="i-tabler-photo mr-2"></div>
          我的相册
        </div>
        <div v-if="column?.albumn?.length > 0" class="f-c-b flex-wrap">
          <div
            @click="Navigation.go({ path: RouterPath.ALBUMN(item.id), router: $router })"
            class="mb-6 cursor-pointer hover line-height-1.5 text-ellipsis line-clamp-2"
            v-for="item in column.albumn">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
    <!-- area-9：其他数据 -->
    <div class="f-c-c font-main mt-15">
      <div class="px-30 w-80vw f-s-b">
        <div class="w-48%">
          <div id="recent-essay-nail" class="caption">
            <div class="i-tabler-arrow-badge-up-filled mr-2"></div>
            最新随笔
          </div>
          <div v-if="column?.latestEssayList?.length > 0">
            <div
              @click="Navigation.go({ path: RouterPath.WORKS(item.id), router: $router })"
              class="mb-10 cursor-pointer hover line-height-1.5 text-ellipsis line-clamp-2"
              v-for="item in column.latestEssayList">
              {{ item.text }}
            </div>
          </div>
        </div>
        <div class="w-48%">
          <div id="recent-comms-nail" class="caption">
            <div class="i-tabler-arrow-badge-up mr-2"></div>
            最新评论
          </div>
          <div v-if="column?.latestComments?.length > 0">
            <div
              @click="Navigation.go({ path: RouterPath.WORKS(item.id), router: $router })"
              class="mb-10 cursor-pointer hover"
              v-for="item in column.latestComments">
              <div>
                {{ item.title }}
              </div>
              <div class="mt-4 f-c-e">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel {
  img {
    transition: opacity 0.75s linear;
  }
}

.divide-bg::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  backdrop-filter: blur(8px);
}
</style>
