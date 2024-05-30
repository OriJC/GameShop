import axios from '@/utils/api.request'

export const getAllGameCategory = () => {
    return axios.request({
        url: 'api/GameCategory/GetAll',
        method: 'get'
    })
}
