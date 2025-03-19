export class CountPostsByCategoriesRequest {
    searchTerm: string | null;
    fromCreatedAt: number | null;
    toCreatedAt: number | null;
    selectedTags: number[] | null;

    constructor(
        searchTerm: string | null,
        fromCreatedAt: number | null,
        toCreatedAt: number | null,
        selectedTags: number[] | null,
    ) {
        this.searchTerm = searchTerm;
        this.fromCreatedAt = fromCreatedAt;
        this.toCreatedAt = toCreatedAt;
        this.selectedTags = selectedTags;
    }
}

