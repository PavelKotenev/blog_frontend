import {defineStore} from "pinia";
import {ref, watch} from "vue";
import {usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";

export const useDatePickerStore = defineStore("date_picker_store", () => {
    const fromCreatedAt = ref<number | null>(null);
    const toCreatedAt = ref<number | null>(null);
    const postsByCategoryStore = usePostsByCategoryStore();

    watch(
        [fromCreatedAt, toCreatedAt],
        async () => {
            await postsByCategoryStore.actionAfterFiltration(false);
        },
        {deep: true}
    );

    const dumpFromCreatedAt = async (): Promise<void> => {
        fromCreatedAt.value = null;
    }
    const dumpToCreatedAt = async (): Promise<void> => {
        toCreatedAt.value = null;
    }
    const toggleFromCreatedAt = async (data: any): Promise<void> => {
        fromCreatedAt.value = data;
    };
    const toggleToCreatedAt = async (data: any): Promise<void> => {
        toCreatedAt.value = data;
    };

    const formatEpochMs = (epochMs: number): string => {
        const date = new Date(epochMs);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour12: false,
        };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate.replace(/,/g, '');
    }


    return {
        fromCreatedAt,
        toCreatedAt,
        formatEpochMs,
        toggleFromCreatedAt,
        toggleToCreatedAt,
        dumpFromCreatedAt,
        dumpToCreatedAt
    };
});
