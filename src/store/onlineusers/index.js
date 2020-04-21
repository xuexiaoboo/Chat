const state = {
    onlineusers: []
}

const mutations = {
    ONLINE_USERS(state, payload) {
        state.onlineusers.push(payload.name)
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}