const state = {
    name: ''
}

const mutations = {
    USER_NAME(state, payload) {
        state.name = payload.name
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