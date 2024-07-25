import axios from '@/utils/api.request'
import Product from '@/models/Product'

export const getAllProduct = () => {
    return axios.request({
        url: 'api/Product/GetAll',
        method: 'get'
    })
}

export const getProductById = (id: string) => {
    return axios.request({
        url: 'api/Product/GetById/'+ id,
        method: 'get'
    })
}

export const createProduct = (product) => {
    return axios.request({
        url: 'api/Product/Insert',
        data: product,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const updateProduct = (product) => {
    return axios.request({
        url: 'api/Product/Update',
        data: product,
        method: 'put',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteProduct = (id: string) => {
    return axios.request({
        url: 'api/Product/Delete/' + id ,
        method: 'delete'
    })
}
