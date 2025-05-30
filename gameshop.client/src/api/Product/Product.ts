import axios from '@/services/api.request'

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

export const createProduct = (product: FormData) => {
    return axios.request({
        url: 'api/Product/Insert',
        data: product,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const updateProduct = (product: FormData) => {
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

export const getProductImageByImageId = (id: string) => {
    return axios.request({
        url: 'api/Product/GetProductImageById?imageId=' + id ,
        method: 'get'
    })
}