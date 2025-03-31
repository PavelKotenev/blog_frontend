import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {createApp} from "vue";
import {createPinia} from "pinia";
import clientRoutes from "@/routes";
import App from "./App.vue";
import "./assets/index.scss";
import {SearchCategories} from "@/modules/post_list_switcher/SearchCategories";
import {RoutesList} from "@/RoutesList";
import {usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";

const routes: Array<RouteRecordRaw> = [...clientRoutes];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);

router.beforeEach(async (to, from, next) => {
    const postsByCategoryStore = usePostsByCategoryStore();
    const categoryPathToEnum: Record<string, SearchCategories> = {
        [RoutesList.Content]: SearchCategories.Content,
        [RoutesList.Title]: SearchCategories.Title,
        [RoutesList.Tag]: SearchCategories.Tag,
        [RoutesList.Id]: SearchCategories.Id,
    };

    if (to.path === RoutesList.Default) {
        return next();
    }

    const category = categoryPathToEnum[to.path];

    const categoryData = postsByCategoryStore.getCategoryData(category);
    if (categoryData.total === 0) {
        return next(RoutesList.Default);
    }

    next();
});

(async () => {
    const postsByCategoryStore = usePostsByCategoryStore();
    await postsByCategoryStore.fetchPostsByCategory(SearchCategories.Default);
    app.mount("#app");
})();
