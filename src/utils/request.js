import axios from 'axios'

const axiosInst = axios.create({
    'baseURL': "/api"
})

export default axiosInst