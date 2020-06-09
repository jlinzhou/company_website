//state为单一状态树
const state = {
    bbgData: [],
}
//更改store中state状态的唯一方法
const mutations = {
    SET_BBG: (state, bbgData) => {
        state.bbgData = bbgData
    },

}

const actions = {
    // user login

    saveBbg({ commit }, data) {
        commit('SET_BBG', data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
