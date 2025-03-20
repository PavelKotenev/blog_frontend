import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {PickerTag} from "@/modules/picker_tag/TagPickerResponse";
import ClientController from "@/Controller";
import {TagPickerRequest} from "@/modules/picker_tag/TagPickerRequest";
import {usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";

export const useTagPickerStore = defineStore("tag_picker_store", () => {
    const searchTerm = ref<string>("");
    const lastTagId = ref<number | null>(null);
    const lastTagPopularity = ref<number | null>(null);
    const suggestedTags = ref<PickerTag[]>([]);
    const selectedTags = ref<PickerTag[]>([]);
    const selectedTagsIds = ref<number[]>([])
    const postsByCategoryStore = usePostsByCategoryStore();

    const suggestedTagsToShow = computed(() => {
        return suggestedTags.value.filter((tag) => !selectedTagsIds.value.includes(tag.id));
    });

    const selectedTagsToShow = computed(() => {
        return selectedTags.value;
    });

    const getTagsForPicker = async () => {
        try {
            const request = new TagPickerRequest(
                searchTerm.value,
                selectedTagsIds.value,
                lastTagId.value,
                lastTagPopularity.value
            );

            const response = await ClientController.getTagsForPicker(request);
            selectedTags.value = response.selectedTags;

            if (response.suggestedTagsBatch?.length > 0) {
                suggestedTags.value.push(...response.suggestedTagsBatch);
                lastTagId.value = response.suggestedTagsBatch[response.suggestedTagsBatch.length - 1].id;
                lastTagPopularity.value = response.suggestedTagsBatch[response.suggestedTagsBatch.length - 1].popularity;
            }
        } catch (error) {
            console.error("Ошибка при загрузке тегов:", error);
        }
    };

    const toggleTag = async (id: number): Promise<void> => {
        const index = selectedTagsIds.value.indexOf(id);
        if (index === -1) {
            selectedTagsIds.value.push(id);
        } else {
            selectedTagsIds.value.splice(index, 1);
        }
        selectedTagsIds.value = selectedTagsIds.value.filter((tagId) => typeof tagId === 'number');

        await getTagsForPicker();
        await postsByCategoryStore.actionAfterFiltration();
    };

    return {
        searchTerm,
        lastTagId,
        lastTagPopularity,
        suggestedTags,
        selectedTags,
        selectedTagsIds,
        suggestedTagsToShow,
        selectedTagsToShow,
        getTagsForPicker,
        toggleTag,
    };
});