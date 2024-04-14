<template>
  <div class="app">
    <UINavbar></UINavbar>
    <routerView></routerView>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import UINavbar from './components/UI/UINavbar.vue'
export default {
  components: {
    UINavbar
  }
}
</script>

<style lang="scss">
body {
  font-family: 'Montserrat', sans-serif;
  background: #e1e1e1;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
