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
            await postsByCategoryStore.actionAfterFiltration();
        },
        {deep: true}
    );

    const dumpFromCreatedAt = async (): Promise<void> => {
        fromCreatedAt.value = null;
    }
    const dumpToCreatedAt = async (): Promise<void> => {
        toCreatedAt.value = null;
    }
    const handleDate = async (modelData: any): Promise<void> => {
        if (modelData) {
            const [start, end] = modelData;
            const startEpoch = start ? start.getTime() : null;
            const endEpoch = end ? end.getTime() : null;
            if (startEpoch != endEpoch) {
                fromCreatedAt.value = startEpoch;
                toCreatedAt.value = endEpoch;
            }
        }
    };

    const formatEpochMs = (epochMs: number): string => {
        const date = new Date(epochMs);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate.replace(/,/g, '');
    }


    return {
        fromCreatedAt,
        toCreatedAt,
        formatEpochMs,
        handleDate,
        dumpFromCreatedAt,
        dumpToCreatedAt
    };
});
