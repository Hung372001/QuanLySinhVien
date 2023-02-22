import http from './common'

class Auth {
    async login(account, password) {
        return await http.post('/auth/sign-up', {
            account: account,
            password: password,
        })
    }
    async logout() {
        return await http.get('/logout')
    }
}

export default new Auth()
