import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { clearAuth } from '@/store/authSlice'
import store from '@/store/store'

interface UrlQueue {
    [key: string]: any
}
class HttpRequest
{
    baseUrl: string
    queue: UrlQueue
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
        this.queue = {}
    }

    destroy(url: string) {
        delete this.queue[url]
    }

    interceptors(instance: AxiosInstance, url: string ) {
        instance.interceptors.request.use(async(config)  => {
            this.queue[url] = true
            // Add request header here if needed

            const token = store.getState().auth.token
            if (token && config.headers)
            {
                config.headers['Authorization'] = 'Bearer ' + token
            }
            return config
        }, error => {
            return Promise.reject(error)
        })

        instance.interceptors.response.use((res: AxiosResponse<any>) => {
            this.destroy(url)

            return { data: res.data, status: res.status} as AxiosResponse<any> 
        }, error => {
            console.log(error)
            if (error && error.response) {
                console.log(error)
                let response = error.response.data
                console.log(error)
                switch (response.status)
                {
                    
                    case 401:
                        store.dispatch(clearAuth())
                        // Redirect to Login Page
                        console.log('test')
                        window.location.href = "/login"
                        break
                    case 403:
                        return Promise.reject(response)
                }
            }
        })
    }

    getInsideConfig() {
        const config: Object = {
            baseURL: this.baseUrl
        }
        return config
    }

    request(options: any) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

export default HttpRequest