<script setup lang="ts">
import type { ComputedRef } from 'vue';
import type { Product } from '@data/type/product';
import CreateOrderForm from '@component/form/CreateOrderForm.vue';
import { useFetch } from '@vueuse/core';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { data } = useFetch('/api/products').json<Record<'data', Product[]>>();

const prouctsIds: ComputedRef<number[]> = computed(() => {
    if (!data.value) {
        return [];
    }

    return data.value.data.map((product) => product.id);
});

async function onCreate(payload: any): Promise<void> {
    console.log('Order created:', payload);

    // something liket this
    // try {
    //     fetch('/api/orders', {
    //         method: 'POST',
    //         body: JSON.stringify(payload),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    // } catch (error) {
    //     console.error('Error creating order:', error);
    // }

    setTimeout(() => {
        router.go(-1);
    }, 500);
}
</script>

<template>
    <CreateOrderForm v-if="data" :productsIds="prouctsIds" @create="onCreate" />
</template>
