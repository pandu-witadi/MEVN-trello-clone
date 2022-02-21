//
//
//
import axios from 'axios'


export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async signup( { dispatch } , credentials) {
            let resp = await axios.post('/api/users', credentials)
            console.log(resp.data)
            resp.data.accessToken ? dispatch('att_token', resp.data.accessToken) : dispatch('att_token', null)
            resp.data.user ? dispatch('att_user', resp.data.user) : dispatch('att_user', null)
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
        }
    }
}
