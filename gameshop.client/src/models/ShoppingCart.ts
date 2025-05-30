import { ProductInfo } from "./Product";
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
    product: ProductInfo;
    quantity: number;
    totalPrice: number;
    imageString: ImageString;
}

interface ImageString
{
    contentType: string;
    imageContent: string;
}



export type { ShoppingCart, ShoppingCartItem }