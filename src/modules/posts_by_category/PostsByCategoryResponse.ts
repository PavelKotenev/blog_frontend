export interface PostsByCategoryResponse {
    total: number;
    postsByCategory: PostByCategory[];
}

export interface PostByCategory {
    id: number
    title: string
    content: string
    tags: PostByCategoryTag[]
    createdAt: number
}

export interface PostByCategoryTag {
    id: number,
    title: string
}