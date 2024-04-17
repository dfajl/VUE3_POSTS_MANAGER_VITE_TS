<template>
  <form @submit.prevent="createPost">
    <h4>Создание поста</h4>
    <UIInput type="text" placeholder="Название" v-model="post.title" />
    <div class="warning" v-if="emptyInputTitle">
      <p>Это поле не может быть пустым!</p>
    </div>
    <UIInput type="text" placeholder="Описание" v-model="post.body" />
    <div class="warning" v-if="emptyInputBody">
      <p>Это поле не может быть пустым!</p>
    </div>

    <UIButton class="margin_btn" type="submit">Создать пост</UIButton>
  </form>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import UIInput from './UI/UIInput.vue'
import UIButton from './UI/UIButton.vue'
import { defineComponent } from 'vue'
import { Post } from '../types/commonTypes'
import type { Ref } from 'vue'
export default defineComponent({
  components: {
    UIButton,
    UIInput
  },
  emits: {
    create: (payload: Ref<Post>) => true
  },
  setup(props, { emit }) {
    const post = ref({
      title: '',
      body: '',
      id: Date.now()
    })
    const emptyInputTitle = ref(false)
    const emptyInputBody = ref(false)

    function createPost() {
      /* Валидация инпутов */
      if (!post.value.title) {
        emptyInputTitle.value = true
        return
      } else if (!post.value.body) {
        emptyInputBody.value = true
        return
      }

      post.value.id = Date.now()
      emit('create', post)
    }

    watch(
      () => [post.value.title, post.value.body],
      ([newTitle, newBody]) => {
        if (newTitle) {
          emptyInputTitle.value = false
        }
        if (newBody) {
          emptyInputBody.value = false
        }
      }
    )

    return {
      post,
      emptyInputTitle,
      emptyInputBody,
      createPost
    }
  }
})
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
}
.warning {
  margin-top: 5px;
  color: rgba(247, 73, 73, 0.813);
}
.margin_btn {
  margin-top: 10px;
  width: 40%;
  height: 30px;
  align-self: center;
}
</style>
