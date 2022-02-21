//
//
//
import axios from 'axios'


export default {
    namespaced: true,
    state: {
        accessToken: null,
        user: null
    },
    getters: {
        authenticated(state) {
            return (state.accessToken !== null) && (state.user !== null)
        },
        GET_USER(state) {
            return state.user
        }
    },
    mutations: {
        SET_TOKEN( state, token) {
            state.accessToken = token
        },
        SET_USER( state, user) {
            state.user = user
        }
    },
    actions: {
        async login( { dispatch } , credentials) {
            let resp = await axios.post('/api/authentication', credentials)
            if ('errors' in resp.data) {
                dispatch('att_token', null)
                dispatch('att_user', null)
                alert('error in login')
                return null
            } else {
                dispatch('att_token', resp.data.accessToken)
                dispatch('att_user', resp.data.user)
                localStorage.setItem('accessToken', resp.data.accessToken)
                localStorage.setItem('user', resp.data.user)
                return resp.data.accessToken
            }
        },

        async att_token( { commit }, token) {
            commit( 'SET_TOKEN', token)
        },
        async att_user( { commit }, user) {
            commit( 'SET_USER', user)
        },

        logout({commit }) {
            commit( 'SET_TOKEN', null)
            commit( 'SET_USER', null)
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
        }
    }
}
