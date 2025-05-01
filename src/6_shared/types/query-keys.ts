export type SortOrder = "asc" | "desc"

export const POSTS_QUERY_KEY = (params: {
  limit: number
  skip: number
  searchQuery?: string
  tag?: string
  sortBy?: string
  selectedTag?: string
  sortOrder?: SortOrder
}) => ["posts", params] as const
