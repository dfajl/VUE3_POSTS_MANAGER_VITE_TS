import axios, { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { Post, PostsState } from '../types/commonTypes'

export const usePostsStore = defineStore('postModule', {
  // Options API like

  state: (): PostsState => ({
    posts: [],
    isPostsLoading: false,
    selectedSort: '',
    searchQuery: '',
    page: 1, //номер страницы
    limit: 10, //кол-во постов на странице
    totalPages: 0, //кол-во страниц
    sortOptions: [
      {
        value: 'title',
        name: 'По названию'
      },
      {
        value: 'body',
        name: 'По содержанию'
      }
    ]
  }),
  getters: {},
  actions: {
    async fetchPosts(): Promise<void> {
      try {
        this.isPostsLoading = true
        const response: AxiosResponse<Post[]> = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?',
          {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          }
        )
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)

        this.posts = response.data
        this.isPostsLoading = false
        //return this.totalPages // нужно только для директивы v-intersection
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(`Ошибка: ${error.message}`)
        }
      } finally {
        this.isPostsLoading = false
      }
    }
  }
})
