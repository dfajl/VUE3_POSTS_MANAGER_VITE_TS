<template>
  <button class="btn" :class="{ bold: isBoldFont }" :style="`margin-bottom: ${marginBottom};`">
    <slot> Click </slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'UIButton',
  props: {
    isBoldFont: {
      type: Boolean,
      default: false
    },
    marginBottom: {
      type: String,
      default: '0px'
    }
  },
  setup(props) {}
}
</script>

<style lang="scss" scoped>
.btn {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  padding: 5px;
  background: rgb(113, 191, 191);
  margin: 0;
  border-radius: 5px;
  transition: 0.3s linear;
  &:hover {
    cursor: pointer;
    background: rgb(47, 138, 138);
  }
}
.bold {
  font-weight: bold;
}
</style>
