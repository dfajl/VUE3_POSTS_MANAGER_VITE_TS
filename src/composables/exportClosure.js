/* TRAIN closures in JavaScript */
export function createCounter() {
  let count = 0 // Переменная, доступная в замыкании
  return function () {
    count += 1
    return count
  }
}
