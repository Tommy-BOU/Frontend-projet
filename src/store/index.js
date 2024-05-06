import { createStore } from 'vuex'
import userService from '@/services/userService';

export default createStore({
  state: {

    userName: localStorage.getItem('userName') || null,
    userRoles: localStorage.getItem('userRoles') || null
  },
  mutations: {

    setUserName(state, name){
      state.userName = name;
      localStorage.setItem('userName', name)
    },
    clearUserName(state, name){
      state.userName = name;
      localStorage.removeItem('userName')
    },
    setUserRoles(state, roles){
      state.userRoles = roles;
      localStorage.setItem('userRoles', roles)
    },
    clearUserRoles(state, roles){
      state.userRoles = roles;
      localStorage.removeItem('userRoles')
    }
  },
  actions: {
    loginUser({ commit }, datas){
      commit('setUserName', datas.name)
      commit('setUserRoles', datas.roles)
    }, 
    async logoutUser({ commit }){
      try{
        await userService.logout();
        commit('clearUserRoles');
        commit('clearUserName');
      }catch(e) { 
        console.error(e)
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.userName,
    hasRoles: state => !!state.userRoles,
    userName: state =>state.userName,
    userRoles: state =>state.userRoles
  }
})
