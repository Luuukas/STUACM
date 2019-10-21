import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {   //要设置的全局访问的state对象
    username : "aa",
    token : false,
    baseUrl : "http://127.0.0.1:8081", // "http://172.16.164.90:8081",
    isLogin : false
};
const getters = {   //实时监听state值的变化(最新状态)
    getUserName() {  //承载变化的changebleNum的值
        return state.username
    },
    getBaseUrl(){
        return state.baseUrl
    },
    getToken(){
        return state.token
    },
    getIsLogin(){
        return state.isLogin
    }
};
const mutations = {
    setUserName(state, username){
        state.username = username
    },
    setToken(state, token){
        state.token = token
    },
    setIsLogin(state, isLogin){
        state.isLogin = isLogin
    }
};
const actions = {
    asetUserName(context,username) {  //同上注释
        context.commit('setUserName',username);
    },
    asetToken(context, token){
        context.commit('setToken', token)
    },
    asetIsLogin(context, isLogin){
        context.commit('setIsLogin', isLogin)
    }
};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;