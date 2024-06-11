import axios from '@/utils/api.request'

interface Address {
    state?: string;
    city?: string;
    street?: string;
    zipCode?: string;
}

interface Company {
    id: string;
    name: string;
    createdDate?: Date;
    address?: Address;
    phoneNumber?: string;
}

export const getAllGameCategory = () => {
    return axios.request({
        url: 'api/Company/GetAll',
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
