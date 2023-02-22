import http from './common'

class Role {
    async index(options = {}) {
        return await http.get('/roles', options)
    }

    async search(options = {}) {
        return await http.get('/roles/search', options)
    }

    async create(data) {
        return await http.post('/roles', data)
    }

    async read(id) {
        return await http.get(`/role/${id}`)
    }

    async update(id, data) {
        return await http.patch(`/role/${id}`, data)
    }

    async delete(id) {
        return await http.delete(`/role/${id}`)
    }
}

export default new Role()

