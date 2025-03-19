import { RouteRecordRaw } from "vue-router";
import PostsByCategory from "@/modules/posts_by_category/PostsByCategory.vue";
import { SearchCategories } from "@/modules/post_list_switcher/SearchCategories";

const clientRoutes: Array<RouteRecordRaw> = [
    {
        path: "/posts/all",
        component: PostsByCategory,
        props: { category: SearchCategories.Default }
    },
    {
        path: "/posts/by_contents",
        component: PostsByCategory,
        props: { category: SearchCategories.Content }
    },
    {
        path: "/posts/by_titles",
        component: PostsByCategory,
        props: { category: SearchCategories.Title }
    },
    {
        path: "/posts/by_tags",
        component: PostsByCategory,
        props: { category: SearchCategories.Tag }
    },
    {
        path: "/posts/by_ids",
        component: PostsByCategory,
        props: { category: SearchCategories.Id }
    }
];

export default clientRoutes;