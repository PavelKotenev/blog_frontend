export interface TagPickerResponse {
    selectedTags: PickerTag[] | [];
    suggestedTagsBatch: PickerTag[] | [];
}

export interface PickerTag {
    id: number;
    title: number;
    postsQuantity: number;
    popularity: number;
}