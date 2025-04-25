<script setup lang="ts">
import type { ComputedRef } from 'vue';
import type { Order } from '@data/type/order';
import Button from '@component/Button.vue';
import { useFetch } from '@vueuse/core';
import { computed } from 'vue';

const { isFetching, error, data } = useFetch('/api/orders').json<Record<'data', Order[]>>();

const isZeroOrders: ComputedRef<boolean> = computed(() => {
    if (isFetching) {
        return false;
    }

    return data.value?.data.length === 0;
});

function onDelete(e: Event, productId: number): void {
    e.preventDefault();

    console.log('Order deleted:', productId);
}

function getTotalProductsQuantity(orderId: number): number {
    if (!data.value) {
        return 0;
    }

    return data.value.data.reduce((acc, order) => {
        order.products.forEach((product) => {
            if (order.id !== orderId) {
                return acc;
            }

            acc += product.quantity;
        });

        return acc;
    }, 0);
}
</script>

<template>
    <!-- this part is kinda duplicated, should create a component like a small nav for this -->
    <div class="p-4 bg-stone-100 rounded-xl flex items-center gap-4 flex-wrap">
        <RouterLink to="/orders/create">
            <Button>Create order</Button>
        </RouterLink>

        <Button>Some other Action</Button>

        <Button>Some other Action</Button>
    </div>

    <h1 class="mt-4 text-2xl font-bold">Orders</h1>

    <div v-if="isFetching" class="mt-4">Loading...</div>

    <div v-if="error" class="mt-4 text-red-500">Error: {{ error.message }}</div>

    <div v-if="isZeroOrders" class="mt-4">No orders found.</div>

    <ul class="mt-4 flex flex-col gap-4" v-if="!isFetching && data">
        <!-- shoud be a component -->
        <li
            v-for="order in data.data"
            :key="order.id"
            class="flex items-center justify-between flex-wrap gap-4"
        >
            <div>
                {{ order.customerCompanyId }} - {{ order.supplierCompanyId }} -
                {{ order.shippingAddress }}

                <div class="flex items-center gap-4">
                    <b>Products count</b> {{ getTotalProductsQuantity(order.id) }}
                    -
                    <money><b>Total price:</b> {{ order.totalPrice }}$</money>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <RouterLink :to="`/orders/edit/${order.id}`">
                    <Button>Edit (Omitted)</Button>
                </RouterLink>

                <form @submit="(e) => onDelete(e, order.id)" method="POST">
                    <input type="hidden" name="orderId" :value="order.id" />
                    <Button variant="secondary" class="ml-4">&#x2715;</Button>
                </form>
            </div>
        </li>
    </ul>
</template>
