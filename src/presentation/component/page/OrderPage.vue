<script setup lang="ts">
import type { ComputedRef } from 'vue';
import type { Product } from '@data/type/product';
import Button from '@component/Button.vue';
import { useFetch } from '@vueuse/core';
import { computed } from 'vue';

const { isFetching, error, data } = useFetch('/api/orders').json<Record<'data', Product[]>>();

const isZeroOrders: ComputedRef<boolean> = computed(() => {
    if (isFetching) {
        return false;
    }

    return data.value?.data.length === 0;
});
</script>

<template>
    <!-- this part is kinda duplicated, should create a component like a small nav for this -->
    <div class="p-4 bg-stone-100 rounded-xl flex items-center gap-4">
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
        <!-- omitted - very similar to what we have in product -->
    </ul>
</template>
