import { expect, test, describe, it } from 'vitest';
import UIInput from '../UIInput.vue';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

//Определяем группу тестов для компонента UIInput
describe('UIInput', () => {

    // Первый тест: проверяет, что компонент определен
    // Ожидаем, что UIInput определен
    it('should be defined', () => {
        expect(UIInput).toBeDefined();
    });

    it('should render input', () => {
        const wrapper = mount(UIInput); // Монтируем компонент UIInput. Получаем обертку для удобной работы
        const input = wrapper.find('input'); // Ищем элемент input внутри компонента
        expect(input.exists()).toBeTruthy(); // Ожидаем, что элемент input существует
    });

    /* 
        Метод find используется для поиска первого соответствующего элемента внутри компонента. Если элемент не найден, он не выбрасывает ошибку, а просто возвращает пустой объект Wrapper. Обычно используется для проверки существования или отсутствия элементов. 

        Метод get также используется для поиска первого соответствующего элемента внутри компонента, но он выбрасывает ошибку, если элемент не найден. Это полезно, когда вы уверены, что элемент должен существовать, и отсутствие элемента должно привести к сбою теста.
    */

    it('should have .input_rounded on input with property rounded === "true"', () => {
        const wrapper = mount(UIInput, {
            // Монтируем компонент UIInput с пропсой rounded равной true
            props: { rounded: true },
        });
        const input = wrapper.get('input'); // Получаем элемент input внутри компонента
        expect(input.classes('input_rounded')).toBeTruthy();
    });

    it('should not have .input_rounded on input without property rounded === "true"', () => {
        const wrapper = mount(UIInput, {
            props: { rounded: false },
        });
        const input = wrapper.get('input');
        expect(input.classes('input_rounded')).toBeFalsy();
    });

    it('should add .input_rounded on input with property rounded === "true" toggle', async () => {
        const wrapper = mount(UIInput, {
            props: { rounded: false },
        });
        const input = wrapper.get('input');
        wrapper.setProps({ rounded: true }); // Динамически изменяем пропсу rounded на true
        await nextTick(); // Ждем, пока Vue обновит DOM

        /* !!! Если не вызвать nextTick(), то тест НЕ пройдет, т.к. рендер и обновление DOM - это асинхронные действия */

        expect(input.classes('input_rounded')).toBeTruthy();
    });
});
