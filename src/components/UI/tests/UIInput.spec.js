import { expect, test, describe, it } from 'vitest'
import UIInput from '../UIInput.vue'
import { mount } from '@vue/test-utils'

describe('UIInput', () => {
  it('should be defined', () => {
    expect(UIInput).toBeDefined()
  })

  it('should render input', () => {
    const wrapper = mount(UIInput)
    const input = wrapper.find('input')
    expect(input.exists()).toBeTruthy()
  })

  it('should have .input_rounded on input with property rounded === "true"', () => {
    const wrapper = mount(UIInput, {
      props: { rounded: true }
    })
    const input = wrapper.get('input')
    expect(input.classes('input_rounded')).toBeTruthy()
  })
})
