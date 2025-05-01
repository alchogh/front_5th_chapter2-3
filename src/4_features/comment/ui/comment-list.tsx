import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../6_shared/ui/buton"
import { useCommentFetchQuery } from "../hooks/use-fetch-comment-query"
import { Post } from "../../../5_entities/post/model/type"
import { highlightText } from "../../../6_shared/ui/highlight-text"

interface CommentListProps {
  selectedPost: Post | null
  searchQuery: string
}

// 댓글 목록
export const CommentList = ({ selectedPost, searchQuery }: CommentListProps) => {
  const { data: comments = [] } = useCommentFetchQuery(selectedPost?.id ?? 0)

  return (
    <>
      {comments?.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="font-medium truncate">{comment.user.username}:</span>
            <span className="truncate">{highlightText({ text: comment.body, highlight: searchQuery })}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, selectedPost.id)}>
              <ThumbsUp className="w-3 h-3" />
              <span className="ml-1 text-xs">{comment.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedComment(comment)
                setShowEditCommentDialog(true)
              }}
            >
              <Edit2 className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, selectedPost.id)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}
