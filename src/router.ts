import { createWebHistory, createRouter } from 'vue-router';

// I should have used named routes instead ofc...
const routes = [
    { path: '/', component: () => import('@component/page/HomePage.vue') },
    { path: '/orders', component: () => import('@component/page/OrderPage.vue') },
    { path: '/orders/create', component: () => import('@component/page/CreateOrderPage.vue') },
    { path: '/products', component: () => import('@component/page/ProductPage.vue') },
    { path: '/products/create', component: () => import('@component/page/CreateProductPage.vue') },
    {
        path: '/products/edit/:id',
        component: () => import('@component/page/UpdateProductPage.vue'),
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
