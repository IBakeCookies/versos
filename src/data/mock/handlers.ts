import type { Product } from '@data/type/product';
import type { Order } from '@data/type/order';

import { http, HttpResponse } from 'msw';

const products: Product[] = [
    { id: 1, name: 'Product 1', price: 100, description: 'Description 1' },
    { id: 2, name: 'Product 2', price: 200, description: 'Description 2' },
    { id: 3, name: 'Product 3', price: 300, description: 'Description 3' },
];

const orders: Order[] = [
    {
        id: 1,
        customerCompanyId: 1,
        supplierCompanyId: 2,
        products: [
            { id: 1, name: 'Product 1', price: 100, description: 'Description 1', quantity: 1 },
            { id: 2, name: 'Product 2', price: 200, description: 'Description 2', quantity: 1 },
        ],
        totalPrice: 300,
        orderDate: '2025-04-23T31:20:01.757Z',
        shippingAddress: '123 Main St, City, Brazil',
    },
    {
        id: 2,
        customerCompanyId: 3,
        supplierCompanyId: 5,
        products: [
            { id: 3, name: 'Product 3', price: 420, description: 'Description 3', quantity: 1 },
            { id: 4, name: 'Product 4', price: 1200, description: 'Description 4', quantity: 2 },
        ],
        totalPrice: 2820,
        orderDate: '2025-04-23T12:21:55.757Z',
        shippingAddress: '456 Elm St, City, Brazil',
    },
];

export const handlers = [
    http.get('http://localhost:5173/api/products', () => {
        return HttpResponse.json({
            data: products,
        });
    }),

    http.get('http://localhost:5173/api/products/:id', ({ params }) => {
        return HttpResponse.json({
            data: products.find((product) => product.id === Number(params.id)),
        });
    }),

    http.get('http://localhost:5173/api/orders', () => {
        return HttpResponse.json({
            data: orders,
        });
    }),
];
