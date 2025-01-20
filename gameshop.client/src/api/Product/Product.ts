import axios from '@/utils/api.request'
import Product from '@/models/Product'

export const getAllProduct = () => {
    return axios.request({
        url: 'api/Product/GetAll',
        method: 'get'
    })
}

export const getAllProductIncludingImage = () => {
    return axios.request({
        url: 'api/Product/GetAllIncludingImage',
        method: 'get'
    })
}

export const getProductById = (id: string) => {
    return axios.request({
        url: 'api/Product/GetById?Id='+ id,
        method: 'get'
    })
}

export const getProductNameAndInventoryById = (id: string) => {
    return axios.request({
        url: 'api/Product/GetProductNameAndInventoryById?=' + id,
        method: 'get'
    })
}

export const createProduct = (product: Product) => {
    return axios.request({
        url: 'api/Product/Insert',
        data: product,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const updateProduct = (product: Product) => {
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
