/* TRAIN closures in JavaScript */
import { createCounter } from './exportClosure.js'
const counterA = createCounter()
const counterB = createCounter()
console.log(counterA()) // 1
console.log(counterA()) // 2
console.log(counterB()) // 1
console.log(counterB()) // 2
console.log(counterA()) // 3
