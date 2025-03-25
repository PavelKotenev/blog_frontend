import {defineStore} from "pinia";
import {reactive, ref, watch} from "vue";
import {PostByCategory} from "@/modules/posts_by_category/PostsByCategoryResponse";
import {SearchCategories} from "@/modules/post_list_switcher/SearchCategories";
import {PostsByCategoryRequest} from "@/modules/posts_by_category/PostsByCategoryRequest";
import {useSearchConditionsStore} from "@/modules/header/searchConditionsStore";
import {useTagPickerStore} from "@/modules/picker_tag/tagPickerStore";
import {useDatePickerStore} from "@/modules/picker_date/datePickerStore";
import ClientController from "@/Controller";
import {useRouter} from "vue-router";
import {useCommonCategoriesStore} from "@/modules/post_list_switcher/commonCategoriesStore";
import {RoutesList} from "@/RoutesList";

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
    const router = useRouter();
    const currentCategory = ref<SearchCategories>(SearchCategories.Default);

    const getCategoryData = (category: SearchCategories): CategoryData => categories[category];

    const actionAfterFiltration = async (): Promise<void> => {
        dumpDataAfterFiltration();
        await commonCategoriesStore.getPostsAccountByCategory()
        await fetchPostsByCategory();
    }

    const fetchPostsByCategory = async () => {
        let category = currentCategory.value;
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

    watch(() => router.currentRoute.value.path, async (newPath) => {
        let newCategory: SearchCategories;
        switch (newPath) {
            case RoutesList.Id:
                newCategory = SearchCategories.Id;
                break;
            case RoutesList.Content:
                newCategory = SearchCategories.Content;
                break;
            case RoutesList.Title:
                newCategory = SearchCategories.Title;
                break;
            case RoutesList.Tag:
                newCategory = SearchCategories.Tag;
                break;
            case RoutesList.Default:
            default:
                newCategory = SearchCategories.Default;
                break;
        }
        if (newCategory !== currentCategory.value) {
            currentCategory.value = newCategory;
            const categoryData = categories[newCategory];
            if (categoryData.posts.length === 0) {
                await fetchPostsByCategory();
            }
        }
    }, { immediate: true });

    watch(() => categories[currentCategory.value].total, (newTotal) => {
        if (newTotal === 0 && currentCategory.value !== SearchCategories.Default) {
            router.push(RoutesList.Default);
        }
    });

    return {
        categories,
        currentCategory,
        actionAfterFiltration,
        dumpDataAfterFiltration,
        fetchPostsByCategory,
        getCategoryData,
    };
});