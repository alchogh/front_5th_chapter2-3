import { Plus } from "lucide-react"
import { Button } from "../../../6_shared/ui/buton"
import { CommentList } from "./comment-list"
import { useCommentModalStore } from "../../../6_shared/store/use-comment-modal-store"
import { Comment, NewComment } from "../../../5_entities/comment/model/type"
import { Post } from "../../../5_entities/post/model/type"
interface RenderCommentsProps {
  selectedPost: Post | null
  searchQuery: string
  setSelectedComment: React.Dispatch<React.SetStateAction<Comment | null>>
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  setShowEditCommentDialog: (show: boolean) => void
}

//댓글 렌더링
export const RenderComments = ({
  selectedPost,
  searchQuery,
  setSelectedComment,
  setNewComment,
  setShowEditCommentDialog,
}: RenderCommentsProps) => {
  const { setShowAddCommentDialog } = useCommentModalStore()
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId: selectedPost.id }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        <CommentList
          selectedPost={selectedPost}
          searchQuery={searchQuery}
          setSelectedComment={setSelectedComment}
          setShowEditCommentDialog={setShowEditCommentDialog}
        />
      </div>
    </div>
  )
}
