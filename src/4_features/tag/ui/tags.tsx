import { SelectItem } from "@radix-ui/react-select"
import { Tag } from "../../../5_entities/tag/model/type"
import { useFetchTagQuery } from "../hooks/use-fetch-tag-query"

export const TagSelectOptions = () => {
  // 태그 가져오기
  const { data: tags } = useFetchTagQuery()
  return (
    <>
      {tags?.map((tag: Tag) => (
        <SelectItem key={tag.url} value={tag.slug}>
          {tag.slug}
        </SelectItem>
      ))}
    </>
  )
}
