import axios from '@/utils/api.request'

export const getAllProductTag = () => {
    return axios.request({
        url: 'api/ProductTag/GetAll',
        method: 'get'
    })
}

export const getProductTagById = (Id: string) => {
    return axios.request({
        url: 'api/ProductTag/GetById/'+ Id,
        method: 'get'
    })
}

export const createProductTag = (name: string) => {
    return axios.request({
        url: 'api/ProductTag/Insert?Name=' + name,
        method: 'post'
    })
}

export const updateProductTag = (id: string, name: string) => {
    return axios.request({
        url: 'api/ProductTag/Update/' + id + '?name=' + name,
        method: 'put'
    })
}

export const deleteProductTag = (id: string) => {
    return axios.request({
        url: 'api/ProductTag/Delete/' + id ,
        method: 'delete'
    })
}
