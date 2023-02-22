import http from './common'

class Dashboard {
    async dashboard() {
        return await http.get('/dashboard')
    }
}

export default new Dashboard()
