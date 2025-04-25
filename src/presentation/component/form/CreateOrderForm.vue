<script setup lang="ts">
// create seperate forms to create and update a product instead
import type { ComputedRef, Ref } from 'vue';
import { ref, computed } from 'vue';
import Input from '@component/Input.vue';
import Button from '@component/Button.vue';

interface Props {
    productsIds: number[];
}

interface CreateOrderPayload {
    customerCompanyId: number;
    supplierCompanyId: number;
    products: {
        id: number;
        quantity: number;
    }[];
    shippingAddress: string;
}

interface ProductRow {
    id: number;
    quantity: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'create', payload: CreateOrderPayload): void;
}>();

const quantityModel = defineModel('quantity');
const productRows: Ref<ProductRow[]> = ref([]);
const productsIds: ComputedRef<number[]> = computed(() => {
    return props.productsIds.filter((productId) => {
        return !productRows.value.some((product) => product.id === productId);
    });
});

function handleSubmit(event: Event): void {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const customerCompanyId = Number(formData.get('customerCompanyId'));
    const supplierCompanyId = Number(formData.get('supplierCompanyId'));
    const shippingAddress = String(formData.get('shippingAddress'));
    const products = productRows.value.map((product) => ({
        id: product.id,
        quantity: product.quantity,
    }));

    if (products.length === 0) {
        // obviously this should be something beautiful, but I am just showing that we are are handling it
        return alert('Please add at least one product to the order.');
    }

    if (!customerCompanyId || !supplierCompanyId || !shippingAddress) {
        return;
    }

    const orderData: CreateOrderPayload = {
        customerCompanyId,
        supplierCompanyId,
        products,
        shippingAddress,
    };

    emit('create', orderData);
}

// @side-effect
function handleSubmitAddProduct(event: Event): void {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const productId = Number(formData.get('products'));
    const quantity = Number(formData.get('quantity'));

    if (!productId || !quantity) {
        return;
    }

    productRows.value.push({ id: productId, quantity });
    quantityModel.value = '';
}

// @side-effect
function onRemoveProduct(productId: number): void {
    productRows.value = productRows.value.filter((product) => product.id !== productId);
}
</script>

<template>
    <h3 class="text-xl">Create an order</h3>

    <form
        class="mt-4 flex flex-col gap-4 bg-stone-100 p-4 rounded-xl"
        @submit="handleSubmitAddProduct"
    >
        Add products to the order
        <select
            class="block border-2 border-stone-200 p-2 rounded-xl"
            name="products"
            id="products"
            :required="true"
        >
            <option value="">--Please choose product's id--</option>
            <option v-for="productId in productsIds" :value="productId" :key="productId">
                {{ productId }}
            </option>
        </select>

        <Input
            name="quantity"
            class="block"
            type="number"
            min="1"
            placeholder="quantity"
            :required="true"
            v-model="quantityModel"
        />

        <Button class="self-start" type="submit"> Add product </Button>
    </form>

    <form class="mt-4 flex flex-col gap-4" @submit="handleSubmit">
        <Input
            name="customerCompanyId"
            type="number"
            placeholder="Customer Company Id"
            :required="true"
        />

        <Input
            name="supplierCompanyId"
            type="number"
            min="1"
            placeholder="Supplier Company Id"
            :required="true"
        />

        <Input name="shippingAddress" type="text" placeholder="Shipping Address" :required="true" />

        <fieldset class="flex items-center gap-4" v-for="product in productRows">
            <input hidden :value="product.id" />
            <input hidden :value="product.quantity" />

            <div
                class="flex gap-4 border-2 border-stone-200 py-2 px-4 rounded-xl w-full items-center"
            >
                <label> Product ID: {{ product.id }} </label>

                -

                <label class="mr-4">Quantity: {{ product.quantity }}</label>

                <Button type="button" class="ml-auto" @click="onRemoveProduct(product.id)">
                    Remove product
                </Button>
            </div>
        </fieldset>

        <Button type="submit" class="self-start"> Create new order </Button>
    </form>
</template>
