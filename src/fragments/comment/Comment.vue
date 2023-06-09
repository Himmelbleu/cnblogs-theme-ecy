<script setup lang="ts">
import { useAnchorStore } from "@/store";
import { CommentApi } from "@/apis";

const props = defineProps({
  postId: { type: String, required: true }
});

const toRefPostId = toRef(props, "postId");

const level = ref();
const { anchor } = storeToRefs(useAnchorStore());
const commentInst = ref();
const comments = ref<BleuComment[]>();
const pageCount = ref(0);
const currIndex = ref(1);

async function fetchData() {
  comments.value = await CommentApi.getList(props.postId, currIndex.value, anchor.value);
  pageCount.value = await CommentApi.getCount(props.postId);
}

function onPost(response: any) {
  comments.value = response.comments;
  pageCount.value = response.count;
}

function onReFinish(response: any) {
  comments.value = response.comments;
  pageCount.value = response.count;
}

function onEdFinish(response: any) {
  comments.value = response.comments;
  pageCount.value = response.count;
}

watch(toRefPostId, async () => {
  await fetchData();
});

watch(level, () => {
  document.querySelector(`#level-${anchor.value}`).scrollIntoView();
  anchor.value = 0;
});

await fetchData();
</script>

<template>
  <div class="l-comment">
    <PostComment :post-id="postId" @on-post="onPost" />
    <div class="caption">
      <div class="i-tabler-list mr-2"></div>
      评论列表
    </div>
    <div class="mt-10" v-if="isLogined && comments?.length">
      <div
        class="clearfix mb-12"
        v-for="(item, index) in comments"
        :key="item.commentId"
        ref="commentInst">
        <div class="f-c-s">
          <img class="mr-4 rd-50% w-14 h-14 object-cover" :src="item.avatar" />
          <div>
            <div class="hover cursor-pointer" @click="Navigation.go(item.space)">
              {{ item.author }}
            </div>
            <div
              class="text-0.9rem text-b mt-2 f-c-c"
              :id="'level-' + item.commentId"
              v-if="anchor == item.commentId"
              ref="level">
              {{ item.layer }} {{ item.date }}
            </div>
            <div class="text-0.9rem text-b mt-2 f-c-c" :id="'level-' + item.commentId" v-else>
              {{ item.layer }} {{ item.date }}
            </div>
          </div>
        </div>
        <div class="mt-4 relative" style="margin-left: 4.5rem">
          <textarea class="z--1 opacity-0 absolute top-0 left-0" :id="'upload-img-' + index" />
          <Markdown
            :unocss-img="BleuVars.config.unocss?.co?.img || 'f-c-s'"
            :unocss-text="BleuVars.config.unocss?.co?.text || 'text-0.9rem'"
            :fancy-group="'comment-' + index"
            :str-html="item.content" />
        </div>
        <div class="more-action float-right f-c-e" v-show="!item.isEditing && !item.isAnsling">
          <el-dropdown>
            <div class="f-c-e text-0.9rem text-b hover">
              <div class="i-tabler-dots-vertical mr-1"></div>
              <div>更多</div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <DiggComment :comment="item" :post-id="postId" />
                </el-dropdown-item>
                <el-dropdown-item>
                  <BuryComment :comment="item" :post-id="postId" />
                </el-dropdown-item>
                <el-dropdown-item>
                  <DeleteComment
                    :comment="item"
                    :comments="comments"
                    :post-id="postId"
                    :item-index="index" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <EditComment
          @on-finish="onEdFinish"
          :post-id="postId"
          :curr-page-index="currIndex"
          :comment="item" />
        <AnswerComment
          @on-finish="onReFinish"
          :post-id="postId"
          :curr-page-index="currIndex"
          :comment="item" />
      </div>
      <div class="mt-10 f-c-e" v-if="pageCount > 1">
        <el-pagination
          @current-change="fetchData"
          layout="prev, pager, next"
          v-model:current-page="currIndex"
          :page-count="pageCount" />
      </div>
    </div>
    <el-empty v-else-if="isLogined && !comments?.length" description="来一条友善的评论吧~" />
    <el-empty v-else description="你没有登录或没有申请博客权限~" />
  </div>
</template>

<style scoped lang="scss">
@include mixins.pc() {
  .more-action {
    --uno: w-8%;
  }
}

@include mixins.mb() {
  .more-action {
    --uno: w-10%;
  }
}
</style>
