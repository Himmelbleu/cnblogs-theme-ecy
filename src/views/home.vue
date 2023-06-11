<script setup lang="ts">
import { useLoading } from "@/hooks/comp-hooks";
import { WorksApi } from "@/apis/works-api";
import { MenuApi } from "@/apis/menu-api";

const list = shallowRef();
const news = shallowRef();

useLoading(async () => {
  const response = await Promise.all([WorksApi.getList(), MenuApi.getNews()]);
  const listVal = response[0];
  listVal.data.splice(4, 6);
  list.value = listVal;
  news.value = response[1];
  console.log(response[1]);
});

const carouselIndex = ref(0);

setInterval(() => {
  carouselIndex.value++;
  if (carouselIndex.value > 3) {
    carouselIndex.value = 0;
  }
}, 5000);

const carouselList = ref([
  "https://anime.shochiku.co.jp/sukimega/wp-content/themes/sukimega_first_theme/common2/images/top_content_kv01.jpg",
  "https://anime.shochiku.co.jp/sukimega/wp-content/themes/sukimega_first_theme/common2/images/top_content_kv02.jpg",
  "https://anime.shochiku.co.jp/sukimega/wp-content/themes/sukimega_first_theme/common2/images/top_content_kv03.jpg",
  "https://anime.shochiku.co.jp/sukimega/wp-content/themes/sukimega_first_theme/common2/images/top_content_kv04.jpg"
]);
</script>

<template>
  <div id="l-home">
    <!-- level-1 -->
    <div class="f-c-c">
      <div class="font-main">
        <div class="f-c-c w-80vw">
          <div p="x-30" class="h-100vh w-52% f-c-c">
            <div class="h-100%">
              <div m="t-10">
                <div text="start 10" class="shine-text">{{ EcyVars.getBlogApp() }} 的博客</div>
                <div
                  text="start 4 ellipsis"
                  class="line-clamp-2 line-height-1.2 letter-spacing-0.1"
                  m="t-4">
                  Time tick away, dream faded away.
                </div>
              </div>
              <div m="t-12">
                <div class="text-primary text-1.4rem f-c-s letter-spacing-0.2" m="b-5">
                  <div class="i-tabler-brand-google-podcasts mr-2"></div>
                  Articles
                </div>
                <div m="b-5" v-if="list?.data" v-for="item in list.data">
                  <div b-b="1 solid d" p="b-4">
                    <div text="primary 0.9rem" class="f-c-s" m="b-4">
                      <div class="i-tabler-clock-hour3 mr-2"></div>
                      {{ item.date }}
                    </div>
                    <div class="text-ellipsis line-clamp-2 line-height-1.2 letter-spacing-0.1">
                      {{ item.text }}
                    </div>
                    <div class="f-c-e" text="0.8rem c" m="t-4">
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
                    class="w-20 cursor-pointer hover:text-primary transition-all-300"
                    p="x-2 y-1"
                    text="center"
                    b="rd-4 solid 2 hover:primary">
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
    </div>
    <!-- level-2 -->
    <div class="f-c-c font-main mt-20">
      <div class="w-80vw f-s-b px-30">
        <div class="w-50%">
          <div class="text-primary text-1.4rem letter-spacing-0.2 f-c-s" m="b-5">
            <div class="i-tabler-info-square-rounded mr-2"></div>
            About Me
          </div>
          <div v-if="news?.length > 0">
            <div class="text-1.1rem">
              <div class="f-c-s" m="t-10">
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
        </div>
        <div class="w-50%">
          <div class="text-primary text-1.4rem letter-spacing-0.2 f-c-s" m="b-5">
            <div class="i-tabler-gizmo mr-2"></div>
            My Skills
          </div>
          <div>
            <skill-graph />
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
</style>
