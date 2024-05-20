<template>
  <h1 style="text-align: center">Страница с постами</h1>

  <div class="btn_wrapper">
    <UIButton @click="showDialogWindow"> Создать пост </UIButton>
    <!-- <UISelect
      :model-value="selectedSort"
      @update:model-value="setSelectedSort"
      :options="sortOptions"
    >
    </UISelect> -->
    <UISelect v-model="selectedSort" :options="sortOptions"> </UISelect>
  </div>

  <UIInput placeholder="Найти пост" v-model="searchQuery" />

  <PostList @deletePost="deletePostItem" :posts="sortedAndSearchPosts" v-if="!isPostsLoading" />
  <div class="post-item_wrapper" v-else>Загружаю посты с сервера...</div>

  <!-- 
    @update:show="isDialogVisible = $event" 
    :show="isDialogVisible"
  -->
  <UIDialogWindow v-model:show="isDialogVisible">
    <template #mainContent> <PostForm @create="createPost" /> </template>
  </UIDialogWindow>
</template>

<script lang="ts">
import PostList from '@/components/PostList.vue'
import usePiniaStore from '../composables/usePiniaStore'
import { ref, onMounted, Ref } from 'vue'
import { Post } from '../types/commonTypes'
import UIButton from '../components/UI/UIButton.vue'
import UIDialogWindow from '../components/UI/UIDialogWindow.vue'
import PostForm from '../components/PostForm.vue'
import UIInput from '../components/UI/UIInput.vue'
import UISelect from '../components/UI/UISelect.vue'

export default {
  components: {
    PostList,
    UIButton,
    UIDialogWindow,
    PostForm,
    UIInput,
    UISelect
  },

  setup() {
    const {
      posts,
      isPostsLoading,
      loadPosts,
      setPosts,
      searchQuery,
      sortedAndSearchPosts,
      sortOptions,
      selectedSort
    } = usePiniaStore()
    const isDialogVisible = ref(false)

    function deletePostItem(id: number): void {
      const filteredPosts = posts.value.filter((item) => item.id !== id)
      setPosts(filteredPosts)
    }

    function showDialogWindow(): void {
      isDialogVisible.value = true
    }

    function createPost(post: Ref<Post>): void {
      const localPosts = [...posts.value, post.value]
      setPosts(localPosts)
      isDialogVisible.value = false
    }

    onMounted(() => {
      if (posts.value.length) {
        return
      } else {
        loadPosts()
      }
    })

    return {
      isPostsLoading,
      posts,
      isDialogVisible,
      deletePostItem,
      showDialogWindow,
      createPost,
      searchQuery,
      sortedAndSearchPosts,
      sortOptions,
      selectedSort
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
