<script setup lang="ts">
import CreateProductForm from '@component/form/CreateProductForm.vue';
import Button from '@component/Button.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

function onCreate(payload: any): void {
    // Handle the create product event API call
    console.log('Product created:', payload);

    setTimeout(() => {
        router.go(-1);
    }, 500);
}
</script>

<template>
    <RouterLink to="/products">
        <Button variant="secondary">Back</Button>
    </RouterLink>

    <CreateProductForm type="create" @create="onCreate" class="mt-4" />
</template>
