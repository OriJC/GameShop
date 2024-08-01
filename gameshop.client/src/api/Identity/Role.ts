import axios from '@/utils/api.request'

export const getAllRole = () => {
    return axios.request({
        url: 'api/Role/GetAll',
        method: 'get'
    })
}

export const getRoleById = (Id: string) => {
    return axios.request({
        url: 'api/Role/GetById/'+ Id,
        method: 'get'
    })
}

export const createRole = (name: string) => {
    return axios.request({
        url: 'api/Role/Insert?Name=' + name,
        method: 'post'
    })
}

export const updateRole = (id: string, name: string) => {
    return axios.request({
        url: 'api/Role/Update/' + id + '?name=' + name,
        method: 'put'
    })
}

export const deleteRole = (id: string) => {
    return axios.request({
        url: 'api/Role/Delete/' + id ,
        method: 'delete'
    })
}
