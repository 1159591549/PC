import axios from '@/libs/axios'
export const get = (url, params = {}) => {
    return axios.get(url, { params })
}
export const post = (url, data = {}) => {
    return axios.post(url, { data })
}