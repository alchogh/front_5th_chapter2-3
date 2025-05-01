import { Textarea } from "../../../6_shared/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../6_shared/ui/dialog"
import { NewComment } from "../../../5_entities/comment/model/type"
import { Button } from "../../../6_shared/ui/buton"
import { useAddCommentMutation } from "../hooks/use-add-comment-query"

interface NewCommentModalProps {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: (open: boolean) => void
  newComment: NewComment
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
}

export const NewCommentModal = ({
  showAddCommentDialog,
  newComment,
  setShowAddCommentDialog,
  setNewComment,
}: NewCommentModalProps) => {
  // 새로운 댓글

  // 댓글 추가
  const { mutate: addCommentMutation } = useAddCommentMutation()

  const addComment = async () => {
    if (!newComment.postId) return
    addCommentMutation(newComment, {
      onSuccess: () => {
        setShowAddCommentDialog(false)
        setNewComment({ body: "", postId: null, userId: 1 })
      },
      onError: (error) => {
        console.error("댓글 추가 오류", error)
      },
    })
  }
  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
