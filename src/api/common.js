import axios from 'axios'

export default axios.create({
    baseURL: '/',
    validateStatus: () => {
        return true
    },
})

