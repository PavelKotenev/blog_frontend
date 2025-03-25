import { RouteRecordRaw } from "vue-router";
import PostsByCategory from "@/modules/posts_by_category/PostsByCategory.vue";
import { SearchCategories } from "@/modules/post_list_switcher/SearchCategories";
import {RoutesList} from "@/RoutesList";

const clientRoutes: Array<RouteRecordRaw> = [
    {
        path: RoutesList.Default,
        component: PostsByCategory,
        props: { category: SearchCategories.Default }
    },
    {
        path: RoutesList.Content,
        component: PostsByCategory,
        props: { category: SearchCategories.Content }
    },
    {
        path: RoutesList.Title,
        component: PostsByCategory,
        props: { category: SearchCategories.Title }
    },
    {
        path: RoutesList.Tag,
        component: PostsByCategory,
        props: { category: SearchCategories.Tag }
    },
    {
        path: RoutesList.Id,
        component: PostsByCategory,
        props: { category: SearchCategories.Id }
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/posts/all"
    }
];

export default clientRoutes;