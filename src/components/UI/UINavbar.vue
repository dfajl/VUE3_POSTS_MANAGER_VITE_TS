<template>
  <div class="navbar">
    <UIButton @click="$router.push('/')">Vue 3</UIButton>
    <UIButton @click="$router.push('/about')">О приложении </UIButton>
    <UIButton @click="$router.push('/posts')"> Страница с постами </UIButton>
  </div>
</template>

<script>
import UIButton from './UIButton.vue'

export default {
  name: 'UINavbar',
  components: {
    UIButton
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  background-color: rgb(179, 178, 178);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.675);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
