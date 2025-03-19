import {defineStore} from "pinia";
import {ref} from "vue";

export const useSearchConditionsStore = defineStore("search_conditions_store", () => {
    const searchTerm = ref<string>('');
    const searchTermValidity = ref<boolean>(false);


    const validateSearchTerm = (): boolean => {
        if (searchTerm.value.length >= 3) {
            searchTermValidity.value = true;
        } else if (searchTerm.value.length > 0) {
            searchTermValidity.value = /\d/.test(searchTerm.value);
        } else {
            searchTermValidity.value = false;
        }
        return searchTermValidity.value;
    };

    return {
        validateSearchTerm,
        searchTerm,
        searchTermValidity
    };
});
