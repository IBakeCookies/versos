<script setup lang="ts">
import CreateProductForm from '@component/form/CreateProductForm.vue';
import { useFetch } from '@vueuse/core';

interface Props {
    id: string;
}

const props = defineProps<Props>();
const { error, data } = useFetch(`/api/products/${props.id}`).json();

function onUpdate(payload: any): void {
    // Handle the update product event API call
    console.log('Product update:', payload);
}
</script>

<template>
    <div v-if="error">
        <p class="text-red-500">Error: {{ error.message }}</p>
    </div>

    <CreateProductForm
        v-if="data"
        @update="onUpdate"
        type="update"
        :id="id"
        :name="data.data.name"
        :price="data.data.price"
        :description="data.data.description"
    />
</template>
