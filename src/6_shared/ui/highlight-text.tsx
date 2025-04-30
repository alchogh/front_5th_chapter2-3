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
      {parts.map((part, index) => {
        const key = `${part.part}-${index}` // or `highlight-${index}`, etc.
        if (part.highlight) {
          return <mark key={key}>{part.part}</mark>
        } else {
          return <span key={key}>{part.part}</span>
        }
      })}
    </span>
  )
}
