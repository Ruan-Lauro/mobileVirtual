import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-muralvirtual.onrender.com'
})

export default api