import { useQuery } from "@tanstack/react-query"
import { postAPI } from "../../../5_entities/post/model/api"

export const usePostsByTagQuery = (tag: string) => {
  return useQuery({
    queryKey: ["posts-by-tag", tag],
    queryFn: () => postAPI.getPostsByTag(tag),
    enabled: !!tag && tag !== "all",
    staleTime: 1000 * 60,
  })
}
