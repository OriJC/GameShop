import axios from '@/utils/api.request'
import Company from '@/models/Company'

export const getAllCompany = () => {
    return axios.request({
        url: 'api/Company/GetAll',
        method: 'get'
    })
}

export const getAllCompanyName = () => {
    return axios.request({
        url: 'api/Company/GetAllCompanyName',
        method: 'get'
    })
}

export const getCompanyById = (Id: string) => {
    return axios.request({
        url: 'api/Company/GetById/'+ Id,
        method: 'get'
    })
}

export const createCompany = (newCompany: Company) => {
    return axios.request({
        url: 'api/Company/Insert',
        data: newCompany,
        method: 'post'
    })
}

export const updateCompany = (newCompany: Company) => {
    return axios.request({
        url: 'api/Company/Update/',
        data: newCompany,
        method: 'put'
    })
}

export const deleteCompany = (id: string) => {
    return axios.request({
        url: 'api/Company/Delete/' + id ,
        method: 'delete'
    })
}
