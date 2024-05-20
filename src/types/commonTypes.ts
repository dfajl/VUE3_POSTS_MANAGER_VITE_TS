export type SortOption = {
  value: string
  name: string
}

export type Post = {
  body: string
  id: number
  title: string
  userId?: string
}

export type PostsState = {
  posts: Post[]
  isPostsLoading: boolean
  selectedSort: 'title' | 'body' | ''
  searchQuery: string
  page: number
  limit: number
  totalPages: number
  sortOptions: SortOption[]
}
