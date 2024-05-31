import axios, { AxiosInstance, AxiosResponse } from 'axios'

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
            //console.log(config)
           return config
        }, error => {
            return Promise.reject(error)
        })

        instance.interceptors.response.use((res: AxiosResponse<any>) => {
            this.destroy(url)

            return { data: res.data, status: res.status} as AxiosResponse<any> 
        }, error => {
            if (error && error.response) {
                let response = error.response.data
                switch (error.response.status) {
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