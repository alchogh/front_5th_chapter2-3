import { splitByHighlight } from "../lib/split-by-hightlight"

interface HighlightTextProps {
  text?: string
  highlight: string
}
export const highlightText = ({ text, highlight }: HighlightTextProps) => {
  if (!text) return null

  const parts = splitByHighlight(text, highlight)

  return (
    <span>
      {parts.map((part) => {
        if (part.highlight) {
          return <mark key={part.part}>{part.part}</mark>
        } else {
          return <span key={part.part}>{part.part}</span>
        }
      })}
    </span>
  )
}
