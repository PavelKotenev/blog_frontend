import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {createApp} from "vue";
import {createPinia} from "pinia";
import clientRoutes from "@/routes";
import App from "./App.vue";
import "./assets/index.scss";
import {usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";
import {SearchCategories} from "@/modules/post_list_switcher/SearchCategories";

const routes: Array<RouteRecordRaw> = [...clientRoutes];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const pinia = createPinia();
const app = createApp(App);
app.use(router);



app.use(pinia);
const postsByCategoryStore = usePostsByCategoryStore();
await postsByCategoryStore.fetchPostsByCategory(SearchCategories.Default);


app.mount("#app");

