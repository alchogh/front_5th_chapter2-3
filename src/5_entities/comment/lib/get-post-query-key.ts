import { usePostFilterStore } from "../../../6_shared/store/\buse-post-filter-store"
import { POSTS_QUERY_KEY } from "../../../6_shared/types/query-keys"

export const getPostsQueryKey = () => {
  const {
    limit,
    skip,
    searchQuery = "",
    sortBy = "",
    sortOrder = "asc",
    selectedTag = "",
  } = usePostFilterStore.getState()

  return POSTS_QUERY_KEY({
    limit,
    skip,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
  })
}
