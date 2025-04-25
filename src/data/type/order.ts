import type { Product } from '@data/type/product';

export interface OrderProduct extends Product {
    quantity: number;
}

export interface Order {
    id: number;
    customerCompanyId: number;
    supplierCompanyId: number;
    products: OrderProduct[];
    totalPrice: number;
    orderDate: string | Date;
    shippingAddress: string;
}
