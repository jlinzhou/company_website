import { login, logout, getInfo } from '@/api/sys/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
//state为单一状态树
const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
}
//更改store中state状态的唯一方法
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },

}

const actions = {
    // user login

    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            // commit('SET_TOKEN', "123456")
            // //设置token，保存在cookie中
            // setToken("123456")
            // resolve()
            //   //发出登录
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                //commit提交给对应的mutations执行
                commit('SET_TOKEN', data.token)
                //设置token，保存在cookie中
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                const { name, avatar, introduction } = data

                // roles must be a non-empty array
                // if (!roles || roles.length <= 0) {
                // reject('getInfo: roles must be a non-null array!')
                // }

                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}