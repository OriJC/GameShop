import axios from '@/services/api.request'

export const getShoppingCart = (userName: string) => {
    return axios.request({
        url: 'api/ShoppingCart/GetCartByUserName?userName=' + userName,
        method: 'get'
    })
}