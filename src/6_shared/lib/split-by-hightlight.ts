// 하이라이트 함수 추가
export const splitByHighlight = (
  text: string | undefined,
  highlight: string,
): { part: string; highlight: boolean }[] => {
  if (!text) return []
  if (!highlight.trim()) {
    return [{ part: text, highlight: false }]
  }

  // 하이라이트 함수 추가
  const regex = new RegExp(`(${highlight})`, "gi")

  const parts = text.split(regex)

  return parts.map((part) => ({
    part,
    highlight: regex.test(part),
  }))
}
