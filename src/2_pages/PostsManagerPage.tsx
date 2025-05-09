import { useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

// 기타 UI 컴포넌트
import { Button } from "../6_shared/ui/buton"
import { Input } from "../6_shared/ui/input"
import { highlightText } from "../6_shared/ui/highlight-text"
import { Card, CardContent, CardHeader, CardTitle } from "../6_shared/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../6_shared/ui/select"
import { Textarea } from "../6_shared/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../6_shared/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../6_shared/ui/table"

import { Post, PostCreateDTO, Author } from "../5_entities/post/model/type"
import { Comment, NewComment } from "../5_entities/comment/model/type"
import { SelectedUser } from "../5_entities/users/model/type"
import { postAPI } from "../5_entities/post/model/api"
import { userAPI } from "../5_entities/users/model/api"

import { TagSelectOptions } from "../4_features/tag/ui/tag-select-options"

import { NewCommentModal } from "../4_features/comment/ui/new-comment-modal"
import { useUpdateCommentMutation } from "../4_features/comment/hooks/use-update-comment-query"

import { RenderComments } from "../4_features/comment/ui/render-comments"
import { usePostsWithAuthorsQuery } from "../4_features/post/hooks/use-fetch-query"
import { useAddPostMutation } from "../4_features/post/hooks/use-add-post-query"
import { usePostFilterStore } from "../6_shared/store/\buse-post-filter-store"
import { useUpdatePostMutation } from "../4_features/post/hooks/use-update-post-query"
import { useDeletePostMutation } from "../4_features/post/hooks/use-delete-post-query"
import { usePostsByTagQuery } from "../4_features/post/hooks/use-posts-by-tag-query"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 페이지 번호
  const {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
  } = usePostFilterStore()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    setSkip(parseInt(queryParams.get("skip") || "0"))
    setLimit(parseInt(queryParams.get("limit") || "10"))
    setSearchQuery(queryParams.get("search") || "")
    setSortBy(queryParams.get("sortBy") || "")
    setSortOrder((queryParams.get("sortOrder") as "asc" | "desc") || "asc")
    setSelectedTag(queryParams.get("tag") || "")
  }, [location.search])

  // 선택된 게시물
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  // 추가 대화 상자 표시
  const [showAddDialog, setShowAddDialog] = useState(false)
  // 수정 대화 상자 표시
  const [showEditDialog, setShowEditDialog] = useState(false)
  // 새로운 게시물
  const [newPost, setNewPost] = useState<PostCreateDTO>({ title: "", body: "", userId: 1 })
  // 로딩 상태
  const [loading, setLoading] = useState(false)

  // 선택된 댓글
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  // 새로운 댓글
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })

  // 댓글 수정 대화 상자 표시
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  // 게시물 상세 보기 대화 상자 표시
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  // 사용자 모달 표시
  const [showUserModal, setShowUserModal] = useState(false)
  // 선택된 사용자
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null)

  const showTagPosts = selectedTag && selectedTag !== "all"
  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 게시물 가져오기
  const { data: defaultData } = usePostsWithAuthorsQuery({
    limit,
    skip,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
  })

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      return
    }
    setLoading(true)
    try {
      // 게시물 검색
      const data = await postAPI.searchPosts(searchQuery)

      // author 추가
      const usersData = await userAPI.getUsers({ limit: 0, skip: 0 })
      const postsWithAuthor: Post[] = data.posts.map((post) => {
        const author = usersData.users.find((u) => u.id === post.userId)
        if (!author) throw new Error(`author not found for userId ${post.userId}`)
        return { ...post, author }
      })
      // 사용자 가져오기
      setPosts(postsWithAuthor)
      // 총 게시물 수
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const { data: tagData } = usePostsByTagQuery(selectedTag)

  const posts = showTagPosts ? tagData?.posts : defaultData?.posts
  const total = showTagPosts ? tagData?.total : defaultData?.total

  const { mutate: addPostMutation } = useAddPostMutation({
    limit,
    skip,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
  })
  // 게시물 추가
  const handleAddPost = async () => {
    addPostMutation(newPost, {
      onSuccess: () => {
        setShowAddDialog(false)
        setNewPost({ title: "", body: "", userId: 1 })
      },
      onError: (error) => {
        console.log("게시물 추가 오류:", error)
      },
    })
  }

  // 게시물 업데이트
  const { mutate: updatePost } = useUpdatePostMutation()
  const handleUpdatePost = async () => {
    if (!selectedPost) return
    updatePost(selectedPost, {
      onSuccess: () => {
        setShowEditDialog(false)
      },
      onError: (error) => {
        console.error("게시물 업데이트 오류:", error)
      },
    })
  }

  // 게시물 삭제
  const { mutate: deletePost } = useDeletePostMutation()
  const handleDeletePost = async (id: number) => {
    deletePost(id)
  }

  // 댓글 업데이트
  const { mutate: updateCommentMutation } = useUpdateCommentMutation()
  const updateComment = async () => {
    updateCommentMutation(selectedComment, {
      onSuccess: () => {
        setShowEditCommentDialog(false)
      },

      onError: (error) => {
        console.error("댓글 수정 실패:", error)
      },
    })
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: Author) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()

      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder((params.get("sortOrder") || "asc") as "asc" | "desc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  // 게시물 테이블 렌더링
  const renderPostTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts?.map((post: Post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText({ text: post.title, highlight: searchQuery })}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        updateURL()
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            {/* 작성자 클릭 시 사용자 모달 열기 */}
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => post.author && openUserModal(post.author)}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value)

                updateURL()
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {/* 태그 가져오기 */}
                <TagSelectOptions />
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPost.userId}
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={handleAddPost}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => {
                if (!selectedPost) return
                setSelectedPost({ ...selectedPost, title: e.target.value })
              }}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => {
                if (!selectedPost) return
                setSelectedPost({ ...selectedPost, body: e.target.value })
              }}
            />
            <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <NewCommentModal newComment={newComment} setNewComment={setNewComment} />

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => {
                if (!selectedComment) return
                setSelectedComment({ ...selectedComment, body: e.target.value })
              }}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText({ text: selectedPost?.title, highlight: searchQuery })}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText({ text: selectedPost?.body, highlight: searchQuery })}</p>
            <RenderComments
              selectedPost={selectedPost}
              searchQuery={searchQuery}
              setSelectedComment={setSelectedComment}
              setNewComment={setNewComment}
              setShowEditCommentDialog={setShowEditCommentDialog}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* 사용자 모달 */}
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>사용자 정보</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}
                {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PostsManager
