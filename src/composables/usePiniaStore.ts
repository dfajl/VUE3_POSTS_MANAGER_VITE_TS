import { usePostsStore } from '../store/postModulePinia'
import { storeToRefs } from 'pinia'
import { Post } from '../types/commonTypes'
import { Ref } from 'vue'

export default function usePiniaStore(): {
  isPostsLoading: Ref<boolean>
  posts: Ref<Post[]>
  loadPosts: () => void
  setPosts: (filteredPosts: Post[]) => void
} {
  const store = usePostsStore() // инициализация стора

  //получаем стейт и геттеры стора
  const { isPostsLoading, posts } = storeToRefs(store)

  //инициализация actions
  const loadPosts = (): void => {
    store.fetchPosts()
  }

  //создаю свою функцию для редактирования стейта
  const setPosts = (filteredPosts: Post[]) => {
    store.posts = filteredPosts
  }

  return {
    isPostsLoading,
    posts,
    loadPosts,
    setPosts
  }
}
