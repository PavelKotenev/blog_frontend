import {RouteRecordRaw} from "vue-router";
import PostsByCategory from "@/modules/posts_by_category/PostsByCategory.vue";
import {RoutesList} from "@/RoutesList";

const clientRoutes: Array<RouteRecordRaw> = [
    {
        path: RoutesList.Default,
        component: PostsByCategory,
    },
    {
        path: RoutesList.Content,
        component: PostsByCategory,
    },
    {
        path: RoutesList.Title,
        component: PostsByCategory,
    },
    {
        path: RoutesList.Tag,
        component: PostsByCategory,
    },
    {
        path: RoutesList.Id,
        component: PostsByCategory,
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/posts/all"
    }
];

export default clientRoutes;