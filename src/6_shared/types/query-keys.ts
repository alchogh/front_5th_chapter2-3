// src/shared/queryKeys.ts
export const POSTS_QUERY_KEY = (params: { limit: number; skip: number; searchQuery?: string; tag?: string }) =>
  ["posts", params] as const
