import { ShoppingCart } from '@/models/ShoppingCart'
import axios from '@/services/api.request'

export const getOrderById = (orderId: string) => {
    return axios.request({
        url: 'api/Order/' + orderId,
        method: 'get'
    })
}

export const createOrder = (data: object) => {
    return axios.request({
        url: 'api/Order',
        data: data,
        method: 'post'
    })
}

export const updateOrder = (cart: ShoppingCart) => {
    return axios.request({
        url: 'api/Order',
        data: cart,
        method: 'put'
    })
}

export const deleteOrder = (orderId: string) => {
    return axios.request({
        url: 'api/Order/'+ orderId,
        method: 'delete'
    })
}

