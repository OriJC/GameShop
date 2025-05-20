import { ShoppingCart } from "@/models/ShoppingCart"

// This is a template in TypeScript, for validating a custom object

export const isValidShoppingCart = (obj: any): obj is ShoppingCart => {
    return (
        obj &&
        typeof obj.id === 'string' &&
        typeof obj.userId === 'number' &&
        Array.isArray(obj.items) &&
        typeof obj.productCount === 'number' &&
        typeof obj.totalPrice === 'number'
    )  
}
