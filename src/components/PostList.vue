<template>
  <div class="post-item_wrapper">
    <h3>Список постов</h3>
    <transition-group name="post-list">
      <PostItem @deletePostByID="deletePost" v-for="post in posts" :key="post.id" :post="post" />
    </transition-group>
    <div class="notification" v-if="!posts.length">
      ПУСТО :( <br />
      ДОБАВЬ ПОСТ!
    </div>
  </div>
</template>

<script lang="ts">
import PostItem from '@/components/PostItem.vue'
import { PropType } from 'vue'
import { Post } from '../types/commonTypes'

export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array as PropType<Post[]>,
      required: true
    }
  },
  emits: ['deletePost'],
  setup({ posts }: { posts: Post[] }, { emit }) {
    function deletePost(id: number) {
      emit('deletePost', id)
    }

    return {
      deletePost
    }
  }
}
</script>

<style lang="scss" scoped>
.post-item_wrapper {
  margin-top: 50px;
}
.notification {
  border: 1px solid seagreen;
  color: rgb(156, 43, 43);
  margin: 0 auto;
  text-align: center;
  margin-top: 150px;
}

// анимация для списка transition-group name="post-list"
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s;
}
.post-list-enter,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  //анимация для сортировки
  transition: transform 0.7s;
}
// конец анимации для списка
</style>
