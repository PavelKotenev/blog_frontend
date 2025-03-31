import {defineStore} from "pinia";
import ClientController from "@/Controller";
import {useSearchConditionsStore} from "@/modules/header/searchConditionsStore";
import {useTagPickerStore} from "@/modules/picker_tag/tagPickerStore";
import {CountPostsByCategoriesRequest} from "@/modules/post_list_switcher/CountPostsByCategoriesRequest";
import {SearchCategories} from "@/modules/post_list_switcher/SearchCategories";
import {useDatePickerStore} from "@/modules/picker_date/datePickerStore";
import {usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";

export const useCommonCategoriesStore
    = defineStore("common_categories_store", () => {
    const postsByCategoriesStore = usePostsByCategoryStore();
    const searchConditionsStore = useSearchConditionsStore();
    const tagPickerStore = useTagPickerStore();
    const datePickerStore = useDatePickerStore();


    const getPostsAccountByCategory = async (): Promise<void> => {
        if (searchConditionsStore.validateSearchTerm()) {
            const request = new CountPostsByCategoriesRequest(
                searchConditionsStore.searchTerm,
                datePickerStore.fromCreatedAt,
                datePickerStore.toCreatedAt,
                tagPickerStore.selectedTagsIds
            );

            const response = await ClientController.countPostsByCategories(request);
            postsByCategoriesStore.getCategoryData(SearchCategories.Id).total = response.totalByIds;
            postsByCategoriesStore.getCategoryData(SearchCategories.Tag).total = response.totalByTags;
            postsByCategoriesStore.getCategoryData(SearchCategories.Content).total = response.totalByContents;
            postsByCategoriesStore.getCategoryData(SearchCategories.Title).total = response.totalByTitles;

        } else {
            [
                SearchCategories.Id,
                SearchCategories.Tag,
                SearchCategories.Content,
                SearchCategories.Title
            ].forEach(category => {
                const categoryData = postsByCategoriesStore.getCategoryData(category);
                categoryData.total = 0;
                categoryData.posts = [];
                categoryData.lastPostId = null;
                categoryData.lastPostCreatedAt = null;
            });
        }
    };

    return {
        getPostsAccountByCategory
    };
});