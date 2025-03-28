import {SearchCategories} from "@/modules/post_list_switcher/SearchCategories";

export class PostsByCategoryRequest {
    category: SearchCategories;
    searchTerm: string | null;
    fromCreatedAt: number | null;
    toCreatedAt: number | null;
    lastPostId: number | null;
    lastPostCreatedAt: number | null;
    selectedTags: number[] | null;

    constructor(
        category: SearchCategories,
        searchTerm: string | null,
        fromCreatedAt: number | null,
        toCreatedAt: number | null,
        lastPostId: number | null,
        lastPostCreatedAt: number | null,
        selectedTags: number[] | null,
    ) {
        this.category = category;
        this.searchTerm = searchTerm;
        this.fromCreatedAt = fromCreatedAt;
        this.toCreatedAt = toCreatedAt;
        this.lastPostId = lastPostId;
        this.lastPostCreatedAt = lastPostCreatedAt;
        this.selectedTags = selectedTags;
    }
}
