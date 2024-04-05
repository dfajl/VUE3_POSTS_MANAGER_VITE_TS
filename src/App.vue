<template>
  <div @click="increment(counter)" class="hello">{{ counter }}</div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    increment(param: number): number {
      console.log(param)
      this.counter++
      return param
    }
  }
}
</script>

<style lang="scss" scoped>
.hello {
  display: block;
  cursor: pointer;
  color: green;
  background: #4c4646;
  height: 50px;
  width: 20%;
  transition: 0.3s linear;
  margin: 0 auto;
  &:hover {
    color: rgb(200, 219, 191);
    background: #cf9e9e;
  }
}
</style>
