import axios from '@/utils/api.request'

export const getAllGameCategory = () => {
    return axios.request({
        url: 'api/GameCategory/GetAll',
        method: 'get'
    })
}

export const getGameCategoryById = (Id: string) => {
    return axios.request({
        url: 'api/GameCategory/GetById/'+ Id,
        method: 'get'
    })
}

export const createGameCategory = (name: string) => {
    return axios.request({
        url: 'api/GameCategory/Insert?Name=' + name,
        method: 'post'
    })
}

export const updateGameCategory = (id: string, name: string) => {
    return axios.request({
        url: 'api/GameCategory/Update/' + id + '?name=' + name,
        method: 'put'
    })
}

export const deleteGameCategory = (id: string) => {
    return axios.request({
        url: 'api/GameCategory/Delete/' + id ,
        method: 'delete'
    })
}
