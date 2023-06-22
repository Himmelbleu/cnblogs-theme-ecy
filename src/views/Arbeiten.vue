<script setup lang="ts">
import { ArbeitenApi } from "@/apis";

const route = useRoute();
const arbeiten = shallowRef();
const arbProps = shallowRef();
const arbPrevNext = shallowRef();
const arbViewPoint = shallowRef();
const arbIsLock = ref(false);
const blogInfo = ref();
let arbeitenId = route.params.id as string;

async function fetchData(mouted?: boolean) {
  Broswer.startLoading();

  const [val1, val2, val3, val4, val5] = await Promise.all([
    ArbeitenApi.getArbeiten(arbeitenId),
    ArbeitenApi.getProps(arbeitenId),
    ArbeitenApi.getPrevNext(arbeitenId),
    ArbeitenApi.getViewPoint(arbeitenId),
    ArbeitenApi.getArbeitenInfo(arbeitenId)
  ]);

  arbeiten.value = val1;
  arbProps.value = val2;
  arbPrevNext.value = val3;
  arbViewPoint.value = val4;
  arbIsLock.value = val1.isLocked;
  blogInfo.value = val5;

  Broswer.setTitle(arbeiten.value.text);
  mouted && Broswer.endLoading();
}

const arbPassword = ref("");

async function submit() {
  const passed = await ArbeitenApi.isPassed(arbPassword.value, arbeitenId);
  if (passed) {
    arbeiten.value = await ArbeitenApi.getLockedArbeiten(arbPassword.value, arbeitenId);
    arbIsLock.value = false;
  }
  ElMessage({
    message: passed ? "密码正确！" : "密码错误！",
    grouping: true,
    type: passed ? "success" : "error"
  });
}

async function vote(type: VoteType) {
  const response = await ArbeitenApi.vote({
    postId: parseInt(arbeitenId),
    isAbandoned: false,
    voteType: type
  });
  if (response && response.isSuccess) {
    type == "Bury" ? arbViewPoint.value.buryCount++ : arbViewPoint.value.diggCount++;
  }
  ElMessage({
    message: response.message,
    grouping: true,
    type: response.isSuccess ? "success" : "error"
  });
}

const markdownInst = ref();
const commentInst = ref();

watch(route, async () => {
  if (route.name === RouterName.Arbeiten) {
    arbeitenId = route.params.id as string;
    await Promise.all([fetchData(true), commentInst.value.fetchData()]);
  }
});

onMounted(() => {
  const anchor = route.hash.match(/#.+/g);

  if (anchor) {
    setTimeout(() => {
      Broswer.scrollIntoView(`#${anchor[0].replace("#", "")}`);
    }, 500);
  }

  Broswer.endLoading();
});

await fetchData();
</script>

<template>
  <div id="l-arbeiten" class="page">
    <div class="content mt-4" v-if="!arbIsLock">
      <div class="text-1.6rem w-100%">{{ arbeiten.text }}</div>
      <div class="f-c-s lt-sm:flex-wrap mt-6 text-0.9rem">
        <div class="f-c-c mr-4">
          <div class="i-tabler-calendar-stats mr-2"></div>
          {{ arbeiten.date }}
        </div>
        <div class="f-c-c mr-4">
          <div class="i-tabler-eye mr-2"></div>
          {{ arbeiten.view }}次阅读
        </div>
        <div class="f-c-c mr-4">
          <div class="i-tabler-message-2 mr-2"></div>
          {{ arbeiten.comm }}条评论
        </div>
        <div class="f-c-c mr-4">
          <div class="i-tabler-language mr-2"></div>
          {{ arbeiten.wordCount }}字
        </div>
        <div
          v-if="isBlogOwner"
          class="f-c-c hover"
          @click="
            Navigation.go({ path: 'https://i.cnblogs.com/EditPosts.aspx?postid=' + arbeitenId })
          ">
          <div class="i-tabler-pencil-minus mr-2"></div>
          编辑
        </div>
      </div>
      <div class="mt-6 mb-10">
        <div class="mb-4 f-c-s flex-wrap" v-if="arbProps?.sorts?.length">
          <div class="f-c-s mt-2 mr-2 text-1rem">
            <div class="i-tabler-category-2 mr-2"></div>
            分类：
          </div>
          <div
            class="mt-2"
            v-for="(item, index) in arbProps.sorts"
            :class="{ 'mr-4': index !== arbProps.sorts.length - 1 }">
            <HollowedBox
              line="dotted"
              hover
              round
              @click="
                Navigation.go({ path: RouterPath.ArbeitenBySort(item.href), router: $router })
              ">
              {{ item.text }}
            </HollowedBox>
          </div>
        </div>
        <div class="f-c-s flex-wrap" v-if="arbProps?.tags?.length">
          <div class="f-c-s mt-2 mr-2 text-1rem">
            <div class="i-tabler-bookmarks mr-2"></div>
            标签：
          </div>
          <div
            class="mt-2"
            v-for="(item, index) in arbProps.tags"
            :class="{ 'mr-4': index !== arbProps.tags.length - 1 }">
            <HollowedBox
              line="dotted"
              hover
              round
              @click="
                Navigation.go({ path: RouterPath.ArbeitenByMark(item.text), router: $router })
              ">
              {{ item.text }}
            </HollowedBox>
          </div>
        </div>
      </div>
      <MarkdownContent :html-str="arbeiten.content" v-model:real-html="markdownInst" />
      <div class="text-b mt-15 f-c-e text-0.9rem">
        <div class="f-c-c mr-4">
          <div class="i-tabler-calendar-stats mr-2"></div>
          {{ arbeiten.date }}
        </div>
        <div class="f-c-c mr-4">
          <div class="i-tabler-eye mr-2"></div>
          {{ arbeiten.view }}次阅读
        </div>
        <div class="f-c-c">
          <div class="i-tabler-message-2 mr-2"></div>
          {{ arbeiten.comm }}条评论
        </div>
      </div>
      <div class="copyright p-5 text-b mt-15">
        <div class="f-c-s flex-wrap">
          <div class="i-tabler-user mr-2"></div>
          作者：<span
            class="hover"
            @click="Navigation.go({ path: 'https://home.cnblogs.com/u/Himmelbleu/' })">
            {{ BleuVars.getBlogApp() }}
          </span>
        </div>
        <div class="f-c-s flex-wrap">
          <div class="i-tabler-sign-right mr-2"></div>
          出处：<span class="hover">https://www.cnblogs.com/himmelbleu/#/p/{{ arbeitenId }}</span>
        </div>
        <div class="f-c-s flex-wrap">
          <div class="i-tabler-license mr-2"></div>
          版权：本作品采用「<span
            class="hover"
            @click="Navigation.go({ path: 'https://creativecommons.org/licenses/by-nc-sa/4.0/' })">
            署名-非商业性使用-相同方式共享 4.0 国际 </span
          >」许可协议进行许可。
        </div>
      </div>
      <div class="prev-next mt-15 text-0.9rem">
        <div class="f-s-s mb-2" v-if="arbPrevNext?.prev?.href">
          <span
            class="hover"
            @click="
              Navigation.go({ path: RouterPath.Arbeiten(arbPrevNext.prev.href), router: $router })
            ">
            上一篇：{{ arbPrevNext.prev.text }}
          </span>
        </div>
        <div class="f-s-e" v-if="arbPrevNext?.next?.href">
          <span
            class="hover"
            @click="
              Navigation.go({ path: RouterPath.Arbeiten(arbPrevNext.prev.href), router: $router })
            ">
            下一篇：{{ arbPrevNext.next.text }}
          </span>
        </div>
      </div>
      <div class="my-10 f-c-e" v-if="!isBlogOwner">
        <div class="f-c-c">
          <el-button type="primary" plain round size="small">
            <span v-if="blogInfo.isFollowed" @click="ArbeitenApi.unfollow">- 取消关注</span>
            <span v-else @click="ArbeitenApi.follow">+ 关注博主</span>
          </el-button>
        </div>
      </div>
      <div class="my-10 f-c-c">
        <div class="f-c-c hover mr-8" @click="vote('Digg')">
          <div class="i-tabler-thumb-up mr-2"></div>
          赞成{{ arbViewPoint.diggCount }}
        </div>
        <div class="f-c-c hover mr-8" @click="vote('Bury')">
          <div class="i-tabler-thumb-down mr-2"></div>
          反对{{ arbViewPoint.buryCount }}
        </div>
        <div class="f-c-c hover" @click="Native.saveArbeiten(arbeitenId)">
          <div class="i-tabler-heart mr-2"></div>
          收藏该文
        </div>
      </div>
      <div class="my-10 f-c-e text-0.9rem">
        分享：
        <div class="f-c-c hover" @click="Native.shareToWechat">
          <div class="i-tabler-brand-wechat mr-2"></div>
          微信
        </div>
      </div>
      <Katalog :real-html="markdownInst" />
      <Amplifier :real-html="markdownInst" />
      <Comment :post-id="arbeitenId" ref="commentInst" />
    </div>
    <div class="content" v-else>
      <div class="modal fixed-lt w-100vw h-100vh l-back-bg f-c-c z-99999">
        <el-form>
          <el-form-item label="密码：">
            <el-input
              show-password
              type="password"
              v-model="arbPassword"
              placeholder="输入博文阅读密码" />
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.copyright {
  background: var(--l-blockcode-bg);
}
</style>
