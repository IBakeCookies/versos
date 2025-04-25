<script setup lang="ts">
import type { ComputedRef } from 'vue';
import type { Product } from '@data/type/product';
import Button from '@component/Button.vue';
import { useFetch } from '@vueuse/core';
import { computed } from 'vue';

const { isFetching, error, data } = useFetch('/api/products').json<Record<'data', Product[]>>();

const isZeroProducts: ComputedRef<boolean> = computed(() => {
    if (isFetching) {
        return false;
    }

    return data.value?.data.length === 0;
});

function onDelete(e: Event, productId: number): void {
    e.preventDefault();

    console.log('Product deleted:', productId);
}
</script>

<template>
    <div class="p-4 bg-stone-100 rounded-xl flex items-center gap-4">
        <RouterLink to="/products/create">
            <Button>Create product</Button>
        </RouterLink>

        <Button>Some other Action</Button>

        <Button>Some other Action</Button>
    </div>

    <h1 class="mt-4 text-2xl font-bold">Products</h1>

    <div v-if="isFetching" class="mt-4">Loading...</div>

    <div v-if="error" class="mt-4 text-red-500">Error: {{ error.message }}</div>

    <div v-if="isZeroProducts" class="mt-4">No products found.</div>

    <ul class="mt-4 flex flex-col gap-4" v-if="!isFetching && data">
        <!-- this can be made a component -->
        <li
            v-for="product in data.data"
            :key="product.id"
            class="flex items-center justify-between"
        >
            {{ product.name }} - {{ product.description }} - {{ product.price }}$

            <div class="flex items-center ml-4">
                <RouterLink class="ml-4" :to="`/products/edit/${product.id}`">
                    <Button>Edit</Button>
                </RouterLink>

                <form @submit="(e) => onDelete(e, product.id)" method="POST">
                    <input type="hidden" name="productId" :value="product.id" />
                    <Button variant="secondary" class="ml-4">&#x2715;</Button>
                </form>
            </div>
        </li>
    </ul>
</template>
