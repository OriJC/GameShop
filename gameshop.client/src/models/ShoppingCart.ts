import Product from "./Product";
interface ShoppingCart{
    id: string;
    userId: number;
    items: ShoppingCartItem[];
    productCount: number;
    totalPrice: number;
}

interface ShoppingCartItem {
    id: string;
    index: number;
    shoppingCartId: string;
    createdAt: Date;
    product: Product;
    quantity: number;
    Price: number;
}

export type { ShoppingCart, ShoppingCartItem }