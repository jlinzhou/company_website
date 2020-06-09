import axios from 'axios'
//import store from '@/store'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
    // baseURL: 'http://localhost:8888/api/private/v1/', // api 的 base_url
    baseURL: '/api',
    withCredentials: true, // 跨域请求时发送 cookies
    timeout: 5000 // request timeout
})

// request interceptor
//service.interceptors.request.use()


service.interceptors.response.use(

    response => {
        //console.log(JSON.parse(response.data))
        // response = JSON.parse(response)
        // console.log(response)
        const res = response.data
        if (res.code !== 0) {
            Message({
                message: res.message || 'error',
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service
