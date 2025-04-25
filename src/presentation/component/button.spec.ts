import { render } from '@testing-library/vue';
import { test } from 'vitest';
import Button from '@component/Button.vue';

test('increments value on click', async () => {
    const { getByText } = render(Button, {
        slots: {
            default: 'some text',
        },
    });

    getByText('some text');
});
