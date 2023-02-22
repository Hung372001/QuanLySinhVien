import auth from '@/api/auth'
import admin from '@/api/admin'
import ability from '@/plugins/ability'
import { AbilityBuilder, Ability } from '@casl/ability';

export default {
    namespaced: true,

    state: () => ({
        user: null
    }),
    getters: {
        getUser(state) {
            return state.user
        }
    },
    actions: {
        async login({ dispatch, commit }, { username, password }) {
            let response = await auth.login(username, password)
            if (response.status === 200) {
                commit('setUser', response.data)
            } else {
                dispatch(
                    'error/setError',
                    {
                        status: response.status,
                        data: response.data
                    },
                    { root: true }
                )
            }
        },
        async logout({ dispatch, commit }) {
            let response = await auth.logout()
            if (response.status === 200) {
                commit('clearUser')
            } else {
                dispatch('error/setError', {
                    status: response.status,
                    data: response.data
                })
            }
        },
        async profile({ dispatch, commit }) {
            let response = await admin.profile()
            if (response.status === 200) {
                commit('setUser', response.data)
            } else {
                dispatch(
                    'error/setError',
                    {
                        status: response.status,
                        data: response.data
                    },
                    { root: true }
                )
            }
        }
    },
    mutations: {
        setUser(state, user) {
            let role = user.role
            const { can, rules } = new AbilityBuilder(Ability);

            if (role) {
                // if (role.alias === 'root') permissions.push({actions: "manage", subject: "all"})
                role.permissions.map(permission => {
                    can(permission.action, permission.parent)
                })
            }
            ability.update(rules)
            state.user = user
        },
        clearUser(state) {
            state.user = null
        }
    }
}

