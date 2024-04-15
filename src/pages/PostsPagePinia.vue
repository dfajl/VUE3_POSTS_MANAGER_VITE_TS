<template>
  <div>
    <h1 style="text-align: center">Страница с постами</h1>
    <PostList :posts="posts" v-if="!isPostsLoading" />
    <div class="post-item_wrapper" v-else>Загружаю посты с сервера...</div>
  </div>
</template>

<script lang="ts">
import PostList from '@/components/PostList.vue'
import usePiniaStore from '../composables/usePiniaStore'
import { ref, onMounted, Ref } from 'vue'
import { Post } from '../types/commonTypes'

export default {
  components: {
    PostList
  },

  setup() {
    const {
      posts,
      isPostsLoading,
      loadPosts
    }: { posts: Ref<Post[]>; isPostsLoading: Ref<boolean>; loadPosts: () => void } = usePiniaStore()

    onMounted(() => {
      loadPosts()
    })

    return {
      isPostsLoading,
      posts
    }
  }
}
</script>

<style lang="scss" scoped>
.btn_wrapper {
  border-radius: 5px;
  margin-top: 20px;
  padding: 0 10px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: rgb(179, 178, 178);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.675);
}

.post-item_wrapper {
  margin-top: 50px;
}

.page_wrapper {
  display: flex;
  margin-top: 50px;
  justify-content: center;
  .page {
    font-size: 20px;
    border: 1px solid black;
    margin-right: 10px;
    padding: 5px;
    cursor: pointer;
  }
}
.observer {
  height: 10px;
}
</style>
