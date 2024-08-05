import axios from '@/utils/api.request'
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
        url: 'api/Identity/User/GetById/'+ Id,
        method: 'get'
    })
}

export const createUser = (data: User) => {
    return axios.request({
        url: 'api/Operation/UserCreate',
        data: data,
        method: 'post'
    })
}

export const updateUser = (id: string, name: string) => {
    return axios.request({
        url: 'api/User/Update/' + id + '?name=' + name,
        method: 'put'
    })
}

export const deleteUser = (id: string) => {
    return axios.request({
        url: 'api/User/Delete/' + id ,
        method: 'delete'
    })
}
