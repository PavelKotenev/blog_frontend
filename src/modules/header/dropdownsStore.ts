import {defineStore} from "pinia";
import {ref} from "vue";

export const useDropdownStore = defineStore("dropdown_store", () => {
    const showSearchDropdown = ref<boolean>(false);

    const toggleDropdown = (status: boolean): void => {
        showSearchDropdown.value = status;
    };

    return {
        toggleDropdown,
        showSearchDropdown,
    };
});
