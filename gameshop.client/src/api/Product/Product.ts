import axios from '@/utils/api.request'

export const getAllProduct = () => {
    return axios.request({
        url: 'api/Product/GetAll',
        method: 'get'
    })
}

export const getProductById = (Id: string) => {
    return axios.request({
        url: 'api/Product/GetById/'+ Id,
        method: 'get'
    })
}

export const createProduct = (name: string) => {
    return axios.request({
        url: 'api/Product/Insert?Name=' + name,
        method: 'post'
    })
}

export const updateProduct = (id: string, name: string) => {
    return axios.request({
        url: 'api/Product/Update/' + id + '?name=' + name,
        method: 'put'
    })
}

export const deleteProduct = (id: string) => {
    return axios.request({
        url: 'api/Product/Delete/' + id ,
        method: 'delete'
    })
}
