import { usePostsStore } from '../store/postModulePinia'
import { storeToRefs } from 'pinia'
import { Post, SortOption } from '../types/commonTypes'
import { Ref, ComputedRef } from 'vue'

export default function usePiniaStore(): {
  isPostsLoading: Ref<boolean>
  posts: Ref<Post[]>
  searchQuery: Ref<string>
  loadPosts: () => void
  setPosts: (filteredPosts: Post[]) => void
  sortedAndSearchPosts: ComputedRef<Post[]>
  selectedSort: Ref<string>
  sortOptions: Ref<SortOption[]>
} {
  const store = usePostsStore() // инициализация стора

  //получаем стейт и геттеры стора
  const { isPostsLoading, posts, searchQuery, sortedAndSearchPosts, selectedSort, sortOptions } =
    storeToRefs(store)

  //инициализация actions
  const loadPosts = (): void => {
    store.fetchPosts()
  }

  //создаю свою функцию для редактирования стейта
  const setPosts = (filteredPosts: Post[]): void => {
    store.posts = filteredPosts
  }

  return {
    isPostsLoading,
    posts,
    loadPosts,
    setPosts,
    searchQuery,
    sortedAndSearchPosts,
    sortOptions,
    selectedSort
  }
}
