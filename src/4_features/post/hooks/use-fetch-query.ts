import { useQuery } from "@tanstack/react-query"
import { postAPI } from "../../../5_entities/post/model/api"
import { POSTS_QUERY_KEY, SortOrder } from "../../../6_shared/types/query-keys"

interface ParamsProps {
  limit: number
  skip: number
  searchQuery?: string
  sortBy?: string
  sortOrder?: SortOrder
  selectedTag?: string
}

export const usePostsWithAuthorsQuery = (params: ParamsProps) => {
  return useQuery({
    queryKey: POSTS_QUERY_KEY(params),
    queryFn: () => postAPI.getPostsWithAuthors(params),
    // staleTime: 0,
  })
}
