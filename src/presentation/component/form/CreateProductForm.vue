<script setup lang="ts">
// create seperate forms to create and update a product instead
import { ref, computed } from 'vue';
import Input from '@component/Input.vue';
import Button from '@component/Button.vue';

interface Props {
    type: 'create' | 'update';
    id?: string;
    name?: string;
    price?: number;
    description?: string;
}

interface CreatePayload {
    name: string;
    price: number;
    description: string;
}

interface UpdatePayload extends CreatePayload {
    id: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'create', payload: CreatePayload): void;
    (e: 'update', payload: UpdatePayload): void;
}>();

const buttonText = computed(() => {
    return props.type === 'create' ? 'Create Product' : 'Update Product';
});

const productName = ref(props.name || '');
const productPrice = ref(props.price || 0);
const productDescription = ref(props.description || '');

function handleSubmit(event: Event): void {
    event.preventDefault();

    const productData = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value,
    };

    if (props.type === 'create') {
        return emit('create', productData);
    }

    if (!props.id) {
        // since I am using the same form for create and update (faster to develop the test case)
        // I need to check if the id is present
        return;
    }

    emit('update', {
        id: props.id,
        ...productData,
    });
}
</script>

<template>
    <div>
        <h3 class="text-xl">Create / Edit a product</h3>

        <form class="mt-4 flex flex-col gap-4" @submit="handleSubmit">
            <Input
                aria-label="Product Name"
                type="text"
                placeholder="Product Name"
                v-model="productName"
                :required="true"
            />

            <Input
                aria-label="Product Price"
                type="number"
                min="1"
                placeholder="Product Price"
                v-model="productPrice"
                :required="true"
            />

            <Input
                aria-label="Product Description"
                type="text"
                placeholder="Product Description"
                v-model="productDescription"
                :required="true"
            />

            <Button type="submit" class="self-start">
                {{ buttonText }}
            </Button>
        </form>
    </div>
</template>
