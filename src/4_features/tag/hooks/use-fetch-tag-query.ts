import { useQuery } from "@tanstack/react-query"
import { TagAPI } from "../../../5_entities/tag/model/api"

export const useFetchTagQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: TagAPI.getTags,
  })
}
