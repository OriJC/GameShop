import axios from '@/services/api.request'

export const getAllCategory = () => {
    return axios.request({
        url: 'api/Category/GetAll',
        method: 'get'
    })
}

export const getCategoryById = (Id: string) => {
    return axios.request({
        url: 'api/Category/GetById/'+ Id,
        method: 'get'
    })
}

export const createCategory = (name: string) => {
    return axios.request({
        url: 'api/Category/Insert?Name=' + name,
        method: 'post'
    })
}

export const updateCategory = (id: string, name: string) => {
    return axios.request({
        url: 'api/Category/Update/' + id + '?name=' + name,
        method: 'put'
    })
}

export const deleteCategory = (id: string) => {
    return axios.request({
        url: 'api/Category/Delete/' + id ,
        method: 'delete'
    })
}
