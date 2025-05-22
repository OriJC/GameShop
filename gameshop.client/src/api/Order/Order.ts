import { OrderDetail } from '@/models/Order'
import { ShoppingCart } from '@/models/ShoppingCart'
import axios from '@/services/api.request'


export const getAllOrder = () => {
    return axios.request({
        url: 'api/Order',
        method: 'get'
    })
}

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

export const updateOrder = (orderDetail: OrderDetail) => {
    return axios.request({
        url: 'api/Order',
        data: orderDetail,
        method: 'put'
    })
}

export const deleteOrder = (orderId: string) => {
    return axios.request({
        url: 'api/Order/'+ orderId,
        method: 'delete'
    })
}

