import { Tag } from "./type"

export const TagAPI = {
  //태그 가져오기
  getTags: async (): Promise<Tag[]> => {
    const response = await fetch("/api/posts/tags")
    return response.json()
  },
}
