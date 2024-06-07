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
        await wrapper.setProps({ rounded: true }); // Динамически изменяем пропсу rounded на true
        /* 
            await nextTick() !!! Если не вызвать nextTick(), то тест НЕ пройдет, т.к. рендер и обновление DOM - это асинхронные действия.
            Но метод setProps под капотом вызывает nextTick(), поэтому може сделать await
        */

        expect(input.classes('input_rounded')).toBeTruthy();
    });

    it('should render input with modelValue', () => {
        const TEST_VALUE = 'test';
        const wrapper = mount(UIInput, {
            props: { modelValue: TEST_VALUE },
        });
        const input = wrapper.get('input');
        expect(input.element.value).toBe(TEST_VALUE);
        /* 
            рендерит ли наш инпут значение, переданное в пропс modelValue?
        */
    });

    it('should emit update:modelValue on input with the passed value', async () => {
        const wrapper = mount(UIInput);
        const input = wrapper.get('input');
        await input.setValue('test'); // устанавливаем на инпуте value и триггерим change и input

        expect(wrapper.emitted('update:modelValue')).toBeTruthy(); // Эмитит ли инпут событие update:modelValue
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1); // порождается ли событие 1 раз?
        expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test']); // Эмитит ли инпут событие update:modelValue с определенным значением?
        /* 
            Запомни, в тестах лучше написать побольше expect и ожидать падение проверки в тесте, а не JS в тесте.
            Если тут убрать первые две проверки с expect и событие не породится  в компоненте, то тест упадет именно 
            из-за ошибки JS, т.к. он не сможет взять undefined[0] 
        */
    });

    it('should have model', async () => {
        let modelValue = 'test';

        //монтирую инпут и передаю туда обработчик события обновления модели
        const wrapper = mount(UIInput, {
            props: {
                modelValue,
            },
            attrs: {
                'onUpdate:modelValue': ($event) => {
                    modelValue = $event;
                    wrapper.setProps({ modelValue });
                },
            },
        });
        const input = wrapper.get('input');
        await input.setValue('new_test');

        expect(modelValue).toBe('new_test');
        expect(wrapper.props('modelValue')).toBe('new_test');
    });
});
