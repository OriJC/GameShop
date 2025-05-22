import axios from '@/services/api.request'
import { LoginModel } from '@/models/User'

export const login = (data: LoginModel) => {
    return axios.request({
        url: 'api/Authentication/login',
        data: data,
        method: 'POST'
    })
}