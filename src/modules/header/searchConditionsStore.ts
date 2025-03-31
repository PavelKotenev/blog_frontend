import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useSearchConditionsStore = defineStore("search_conditions_store", () => {
    const searchTerm = ref<string>('');
    const searchTermValidity = ref<boolean>(true);

    const validateSearchTerm = (): boolean => {
        if (searchTerm.value.length === 0) return true;
        if (searchTerm.value.length >= 3) return true;
        return /\d/.test(searchTerm.value);
    };

    watch(searchTerm, () => {
        searchTermValidity.value = validateSearchTerm();
    });

    return {
        validateSearchTerm,
        searchTerm,
        searchTermValidity
    };
});
