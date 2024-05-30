import HttpRequest from './axios'
import { config } from '../app.config' 


const axios = new HttpRequest(config.host.baseUrl)
export default axios 