import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-muralvirtual.onrender.com'
})

export default api

//https://api-muralvirtual.onrender.com
//http://192.168.18.82:8000