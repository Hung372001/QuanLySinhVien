import { createStore } from 'vuex'
import error from './error'
import auth from './counter'
import dashboard from './dashboard'

const store = createStore({
    modules: {
        error,
        auth,
        dashboard,
    },
})

export default store
