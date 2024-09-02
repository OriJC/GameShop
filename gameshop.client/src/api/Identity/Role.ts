import axios from '@/utils/api.request'

export const getAllRole = () => {
    return axios.request({
        url: 'api/Identity/Role/GetAllRole',
        method: 'get'
    })
}

export const getAllRoleIdAndName = () => {
    return axios.request({
        url: 'api/Identity/Role/GetAllRoleNameAndId',
        method: 'get'
    })
}

export const getRoleById = (Id: string) => {
    return axios.request({
        url: 'api/Identity/Role/GetRoleById?id='+ Id,
        method: 'get'
    })
}

export const createRole = (name: string) => {
    return axios.request({
        url: 'api/Identity/Role/CreateRole?Name=' + name,
        method: 'post'
    })
}

export const updateRole = (id: string, name: string) => {
    return axios.request({
        url: 'api/Identity/Role/UpdateRole?id=' + id + '&name=' + name,
        method: 'put'
    })
}

export const deleteRole = (id: string) => {
    return axios.request({
        url: 'api/Identity/Role/DeleteRole?id=' + id ,
        method: 'delete'
    })
}
