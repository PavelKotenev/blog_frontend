export class TagPickerRequest {
    searchTerm: string | null;
    selectedTagIds: number[] | [];
    lastTagId: number | null;
    lastTagPopularity: number | null;

    constructor(
        searchTerm: string | null,
        selectedTagIds: number[] | [],
        lastTagId: number | null,
        lastTagPopularity: number | null
    ) {
        this.searchTerm = searchTerm;
        this.selectedTagIds = selectedTagIds;
        this.lastTagId = lastTagId;
        this.lastTagPopularity = lastTagPopularity;
    }
}
