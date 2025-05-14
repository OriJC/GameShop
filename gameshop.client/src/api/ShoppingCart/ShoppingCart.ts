import axios from '@/services/api.request'

export const getShoppingCartInfo = (userName: string) => {
    return axios.request({
        url: 'api/ShoppingCart/GetCartInfoByUserName?userName=' + userName,
        method: 'get'
    })
}

export const getShoppingCart = (userName: string) => {
    return axios.request({
        url: 'api/ShoppingCart/GetCartByUserName?userName=' + userName,
        method: 'get'
    })
}

export const updateItemQuantity = (userName: string, cartItemId: string, newQuantity: number) => {
    return axios.request({
        url: 'api/ShoppingCart/UpdateShoppingCartQuantity?userName=' + userName + '&shoppingCartItemId=' + cartItemId + '&newQuantity=' + newQuantity,
        method: 'put'
    })
}

export const RemoveItemFromCart = (userName: string, cartItemId: string) => {
    return axios.request({
        url: 'api/ShoppingCart/RemoveItemFromCart?userName=' + userName + '&itemId=' + cartItemId,
        method: 'delete'
    })
}

export const addShoppingCartItemToCart = (userName: string, productId: string, quantity: number) => {
    return axios.request({
        url: 'api/ShoppingCart/AddItemToCartByUserName?userName='+ userName +'&productId=' + productId+'&Quantity=' + quantity,
        method: 'post',
        data: {
            userName: userName,
            productId: productId,
            quantity: quantity
        },
    })
}



