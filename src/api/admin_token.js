import http from './common'

class AdminToken {
    async index(options = {}) {
        return await http.get('/admin-tokens', options)
    }

    async update(id, data) {
        return await http.patch(`/admin-token/${id}`, data)
    }
}

export default new AdminToken()
