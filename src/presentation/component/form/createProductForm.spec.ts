import { render } from '@testing-library/vue';
import { test } from 'vitest';
import CreateProductForm from '@component/form/CreateProductForm.vue';

test('increments value on click', async () => {
    const { getByLabelText } = render(CreateProductForm, {
        props: {
            type: 'create',
        },
    });

    getByLabelText('Product Name');
    getByLabelText('Product Description');
    getByLabelText('Product Price');
});
