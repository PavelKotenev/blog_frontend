export class PostsByCategoryRequest {
    category: string;
    searchTerm: string | null;
    fromCreatedAt: number | null;
    toCreatedAt: number | null;
    lastPostId: number | null;
    lastPostCreatedAt: number | null;
    selectedTags: number[] | null;

    constructor(
        string: string,
        searchTerm: string | null,
        fromCreatedAt: number | null,
        toCreatedAt: number | null,
        lastPostId: number | null,
        lastPostCreatedAt: number | null,
        selectedTags: number[] | null,
    ) {
        this.category = string;
        this.searchTerm = searchTerm;
        this.fromCreatedAt = fromCreatedAt;
        this.toCreatedAt = toCreatedAt;
        this.lastPostId = lastPostId;
        this.lastPostCreatedAt = lastPostCreatedAt;
        this.selectedTags = selectedTags;
    }
}
