import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/about",
        component: () => import("@/views/About.vue"),
    },
    {
        path: "/product",
        component: () => import("@/views/Product.vue"),
    },
    {
        path: "/scene",
        component: () => import("@/views/Scene.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
