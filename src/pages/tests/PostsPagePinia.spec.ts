import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import PostsPagePinia from '../PostsPagePinia.vue';
import usePiniaStore from '../../composables/usePiniaStore';
import { mount, flushPromises } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

vi.mock('../../composables/useIntersectionObserver');
describe('PostsPagePinia', () => {
    /* it('should match snapshot', () => {
        const wrapper = mount(PostsPagePinia);

        // Сравниваем снепшот с ожидаемым
        expect(wrapper.html()).toMatchSnapshot();
    }); */
    let wrapper: ReturnType<typeof mount>;
    beforeEach(() => {
        wrapper = mount(PostsPagePinia, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn,
                    }),
                ],
            },
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });
    it('displays posts received from the store with correct styling', async () => {
        const postsStore = usePiniaStore();

        // Задаем тестовые данные постов в хранилище
        postsStore.posts.value = [
            { id: 1, title: 'Post 1', body: 'Body 1' },
            { id: 2, title: 'Post 2', body: 'Body 2' },
        ];

        // Ждем обновления DOM после изменения состояния
        await nextTick();

        // Проверяем, что количество отрендеренных постов соответствует количеству постов в хранилище
        const posts = wrapper.findAll('.post_item');
        expect(posts).toHaveLength(2);

        // Проверяем текст заголовков постов
        expect(posts[0].text()).toBe(
            'Номер поста: 1Название: Post 1Описание: Body 1 Удалить пост  Открыть пост',
        );
        expect(posts[1].text()).toBe(
            'Номер поста: 2Название: Post 2Описание: Body 2 Удалить пост  Открыть пост',
        );
    });
});
