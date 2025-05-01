import { useQuery } from "@tanstack/react-query"
import { postAPI } from "../../../5_entities/post/model/api"
import { PostListResponse } from "../../../5_entities/post/model/type"
import { userAPI } from "../../../5_entities/users/model/api"
import { User } from "../../../5_entities/users/model/type"

interface UsePostsQueryProps {
  limit: number
  skip: number
  searchQuery?: string
  tag?: string
}

export const usePostsQuery = ({ limit, skip, searchQuery, tag }: UsePostsQueryProps) => {
  return useQuery<PostListResponse>({
    queryKey: ["posts", { limit, skip, searchQuery, tag }],
    queryFn: async () => {
      let response: PostListResponse

      // 게시물 데이터 가져오기
      if (searchQuery) {
        response = await postAPI.searchPosts(searchQuery)
        console.log("searchQuery", searchQuery)
      } else if (tag) {
        response = await postAPI.searchPostsByTag(tag)
      } else {
        response = await postAPI.getPosts({ limit, skip })
      }

      // 사용자 데이터 가져오기
      const { users } = await userAPI.getUsers({ limit: 0, skip: 0 })

      // 각 post에 author 붙이기
      const postsWithAuthors = response.posts.map((post) => ({
        ...post,
        author: users.find((user: User) => user.id === post.userId),
      }))

      return {
        ...response,
        posts: postsWithAuthors,
      }
    },
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    retry: 1,
  })
}
