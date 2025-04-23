import axios from '@/services/api.request'
import User from '@/models/User'

export const getAllUser = () => {
    return axios.request({
        url: 'api/Identity/User/GetAllUser',
        method: 'get'
    })
}

export const getAllUserNameAndId = () => {
    return axios.request({
        url: 'api/Identity/User/GetAllUserNameAndId',
        method: 'get'
    })
}

export const getUserById = (Id: string) => {
    return axios.request({
        url: 'api/Identity/User/GetById?id='+ Id,
        method: 'get'
    })
}

export const createUser = (data: User) => {
    return axios.request({
        url: 'api/Identity/User/CreateUser',
        data: data,
        method: 'post'
    })
}

export const updateUser = (id: string, data: User) => {
    return axios.request({
        url: 'api/Identity/User/UpdateUser?id=' + id ,
        data: data,
        method: 'put'
    })
}

export const deleteUser = (id: string) => {
    return axios.request({
        url: 'api/identity/User/DeleteUser?id=' + id ,
        method: 'delete'
    })
}
