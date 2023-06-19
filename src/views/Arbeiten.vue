<script setup lang="ts">
import { ArbeitenApi } from "@/apis";

const route = useRoute();
const arbeiten = shallowRef();
const arbProps = shallowRef();
const arbPrevNext = shallowRef();
const arbViewPoint = shallowRef();
const arbIsLock = ref(false);
const arbPassword = ref("");
const markdownInst = ref();
const commentInst = ref();
let arbeitenId = route.params.id as string;

async function fetchData(mouted?: boolean) {
  Broswer.startLoading();

  const [val1, val2, val3, val4] = await Promise.all([
    ArbeitenApi.getArbeiten(arbeitenId),
    ArbeitenApi.getProps(arbeitenId),
    ArbeitenApi.getPrevNext(arbeitenId),
    ArbeitenApi.getViewPoint(arbeitenId)
  ]);

  arbeiten.value = val1;
  arbProps.value = val2;
  arbPrevNext.value = val3;
  arbViewPoint.value = val4;
  arbIsLock.value = val1.isLocked;

  Broswer.setTitle(arbeiten.value.text);
  mouted && Broswer.endLoading();
}

async function submit() {
  const passed = await ArbeitenApi.isPassed(arbPassword.value, arbeitenId);
  if (passed) {
    arbeiten.value = await ArbeitenApi.getLockedWorks(arbPassword.value, arbeitenId);
    arbIsLock.value = false;
  }
  ElMessage({
    message: passed ? "密码正确！" : "密码错误！",
    grouping: true,
    type: passed ? "success" : "error"
  });
}

async function vote(type: VoteType) {
  const res = await ArbeitenApi.vote({
    postId: parseInt(arbeitenId),
    isAbandoned: false,
    voteType: type
  });
  if (res && res.isSuccess) {
    type == "Bury" ? arbViewPoint.value.buryCount++ : arbViewPoint.value.diggCount++;
  }
  ElMessage({ message: res.message, grouping: true, type: res.isSuccess ? "success" : "error" });
}

watch(route, async () => {
  if (route.name === RouterName.Arbeiten) {
    arbeitenId = route.params.id as string;
    await fetchData(true);
    await commentInst.value.fetchData();
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
  <div id="l-works" class="page">
    <div class="content" v-if="!arbIsLock">
      <div class="text-1.6rem font-bold text-ellipsis line-clamp-2 w-100%">{{ arbeiten.text }}</div>
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
      <div class="mt-6 mb-15">
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
      <div class="prev-next mt-15 text-0.9rem">
        <div
          class="hover f-s-s mb-2"
          @click="
            Navigation.go({ path: RouterPath.Arbeiten(arbPrevNext.prev.href), router: $router })
          "
          v-if="arbPrevNext?.prev?.href">
          上一篇：{{ arbPrevNext.prev.text }}
        </div>
        <div
          class="hover f-s-s"
          @click="
            Navigation.go({ path: RouterPath.Arbeiten(arbPrevNext.next.href), router: $router })
          "
          v-if="arbPrevNext?.next?.href">
          下一篇：{{ arbPrevNext.next.text }}
        </div>
      </div>
      <div class="my-10 f-c-e">
        <div class="mr-5">
          <el-button plain @click="vote('Digg')">
            点赞 {{ arbViewPoint.diggCount }}
            <template #icon>
              <div class="i-tabler-thumb-up"></div>
            </template>
          </el-button>
        </div>
        <div>
          <el-button plain @click="vote('Bury')">
            反对 {{ arbViewPoint.buryCount }}
            <template #icon>
              <div class="i-tabler-thumb-down"></div>
            </template>
          </el-button>
        </div>
      </div>
      <Katalog :real-html="markdownInst" />
      <Amplifier :real-html="markdownInst" />
      <Comment :post-id="arbeitenId" ref="commentInst" />
    </div>
    <div class="content" v-else>
      <div class="modal fixed-lt w-100vw h-100vh l-back-bg f-c-c z-999999">
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
