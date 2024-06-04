import { config } from '@vue/test-utils'
import { JSDOM } from 'jsdom'

// Создаем экземпляр JSDOM и получаем window из него
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

// Приводим типы для глобальных объектов
global.window = window as unknown as Window & typeof globalThis
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
} as Navigator

// Добавляем свойство window.self
Object.defineProperty(window, 'self', {
  value: window,
  writable: true
})

// Настройка глобальных моков для Vue Test Utils, если необходимо
config.global.mocks = {
  $t: (msg: string) => msg
}
