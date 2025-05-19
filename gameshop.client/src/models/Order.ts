import Product from "./Product";
import { ShoppingCart, ShoppingCartItem } from "./ShoppingCart";

interface OrderHeader {
    id: string;
    applicationUserName: string;
    orderDate: Date;
    shippingDate: Date;
    orderTotal: number;
    orderStatus: string;
    paymentStatus: string;
    trackingNumber: string;
    paymentDate: Date;
    paymentDueDate: Date;
    sessionId: string;
    phoneNumber: string;
    state: string;
    city: string;
    streetAddress: string;
    postalCode: string;
    name: string;
}

interface OrderDetail {
    id: string;
    orderId: string;
    orderHeader: OrderHeader;
    items: ShoppingCartItem[];
    itemCount: number;
    price: number;
}

export type {OrderDetail};
