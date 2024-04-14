<template>
  <div class="post_item">
    <div style="width: 80%">
      <div><strong>Номер поста:</strong> {{ post.id }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div style="width: 10%">
      <UIButton class="post_btn" marginBottom="10px"> Удалить пост </UIButton>
      <UIButton class="post_btn"> Открыть пост </UIButton>
    </div>
  </div>
</template>

<script lang="ts">
import UIButton from './UI/UIButton.vue'
import { Post } from '../types/commonTypes'
import { PropType } from 'vue'
export default {
  components: { UIButton },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true
    }
  },

  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.post {
  &_item {
    margin-top: 15px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    background-color: rgb(203, 201, 201);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.675);
  }
  &_btn {
    width: 100%;
  }
}
</style>
