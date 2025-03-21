import {defineStore} from "pinia";
import {reactive} from "vue";
import {PostByCategory} from "@/modules/posts_by_category/PostsByCategoryResponse";
import {SearchCategories} from "@/modules/post_list_switcher/SearchCategories";
import {PostsByCategoryRequest} from "@/modules/posts_by_category/PostsByCategoryRequest";
import {useSearchConditionsStore} from "@/modules/search/searchConditionsStore";
import {useTagPickerStore} from "@/modules/picker_tag/tagPickerStore";
import {useDatePickerStore} from "@/modules/picker_date/datePickerStore";
import ClientController from "@/Controller";
import {useRoute} from "vue-router";
import {useCommonCategoriesStore} from "@/modules/post_list_switcher/commonCategoriesStore";

export type CategoryData = {
    posts: PostByCategory[];
    total: number;
    lastPostId: number | null;
    lastPostCreatedAt: number | null;
};

const createCategoryData = (): CategoryData => ({
    posts: [],
    total: 0,
    lastPostId: null,
    lastPostCreatedAt: null,
});

const initialCategories: Record<SearchCategories, CategoryData> = {
    [SearchCategories.Default]: createCategoryData(),
    [SearchCategories.Content]: createCategoryData(),
    [SearchCategories.Title]: createCategoryData(),
    [SearchCategories.Tag]: createCategoryData(),
    [SearchCategories.Id]: createCategoryData(),
};

export const usePostsByCategoryStore = defineStore("posts_by_category_store", () => {
    const categories = reactive(initialCategories);
    const commonCategoriesStore = useCommonCategoriesStore();
    const searchConditionsStore = useSearchConditionsStore();
    const tagPickerStore = useTagPickerStore();
    const datePickerStore = useDatePickerStore();
    const route = useRoute();

    const getCategoryData = (category: SearchCategories): CategoryData => categories[category];

    const getCurrentCategory = (): SearchCategories => {
        switch (route.path) {
            case "/posts/by_ids":
                return SearchCategories.Id;
            case "/posts/by_contents":
                return SearchCategories.Content;
            case "/posts/by_titles":
                return SearchCategories.Title;
            case "/posts/by_tags":
                return SearchCategories.Tag;
            case "/posts/all":
            default:
                return SearchCategories.Default;
        }
    };

    const actionAfterFiltration = async () : Promise<void> => {
        dumpDataAfterFiltration();
        await commonCategoriesStore.getPostsAccountByCategory()
        await fetchPostsByCategory(SearchCategories.Default);
    }

    const fetchPostsByActiveRoute = async (): Promise<void> => {
        const currentCategory = getCurrentCategory();
        await fetchPostsByCategory(currentCategory);
    };

    const fetchPostsByCategory = async (category: SearchCategories) => {
        const categoryData = getCategoryData(category);

        const request = new PostsByCategoryRequest(
            category,
            searchConditionsStore.searchTerm,
            datePickerStore.fromCreatedAt,
            datePickerStore.toCreatedAt,
            categoryData.lastPostId,
            categoryData.lastPostCreatedAt,
            tagPickerStore.selectedTagsIds
        );
        try {
            const response = await ClientController.getPostsByCategory(request);

            if (category == SearchCategories.Default) {
                categoryData.total = response.total;
            }

            const newPosts = response.postsByCategory;
            categoryData.posts.push(...newPosts);
            if (category == SearchCategories.Default) {
            }
            defineLastPostParams(category);
        } catch (error) {
            console.error("Error while posts fetch:", error);
        }
    };
    const dumpDataAfterFiltration = () => {
        Object.keys(categories).forEach((category) => {
            const categoryData = categories[category as SearchCategories];
            categoryData.lastPostId = null;
            categoryData.lastPostCreatedAt = null;
            categoryData.total = 0;
            categoryData.posts = [];
        });


    };
    const defineLastPostParams = (category: SearchCategories) => {
        const categoryData = getCategoryData(category);
        const posts = categoryData.posts;
        if (posts.length > 0) {
            categoryData.lastPostId = posts[posts.length - 1].id;
            categoryData.lastPostCreatedAt = posts[posts.length - 1].createdAt;
        }
    };

    return {
        categories,
        actionAfterFiltration,
        dumpDataAfterFiltration,
        fetchPostsByActiveRoute,
        fetchPostsByCategory,
        getCategoryData,
    };
});