import { usePostsStore } from '../store/postModulePinia'
import { storeToRefs } from 'pinia'
import { Post } from '../types/commonTypes'
import { Ref, ComputedRef } from 'vue'

export default function usePiniaStore(): {
  isPostsLoading: Ref<boolean>
  posts: Ref<Post[]>
  searchQuery: Ref<string>
  loadPosts: () => void
  setPosts: (filteredPosts: Post[]) => void
  searchPosts: ComputedRef<Post[]>
} {
  const store = usePostsStore() // инициализация стора

  //получаем стейт и геттеры стора
  const { isPostsLoading, posts, searchQuery, searchPosts } = storeToRefs(store)

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
    searchPosts
  }
}
