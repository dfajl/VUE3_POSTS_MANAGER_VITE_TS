<template>
  <select class="mainClass" :value="modelValue" @change="changeOption">
    <option disabled value="">Сортировать</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { SortOption } from '../../types/commonTypes'
import { PropType } from 'vue'
export default {
  name: 'UISelect',
  props: {
    modelValue: {
      type: [String, Number]
    },
    options: {
      type: Array as PropType<SortOption[]>,
      default: () => []
    }
  },
  emits: {
    'update:modelValue': (payload: string | number) => true
  },
  setup(props, { emit }) {
    function changeOption(event: Event) {
      emit('update:modelValue', (event.target as HTMLInputElement).value)
    }
    return {
      changeOption
    }
  }
}
</script>

<style lang="scss" scoped>
.mainClass {
  border-radius: 5px;
  height: 30px;
  background: rgb(98, 183, 183);
  &:hover {
    cursor: pointer;
    background: rgb(92, 212, 212);
  }
}
</style>
