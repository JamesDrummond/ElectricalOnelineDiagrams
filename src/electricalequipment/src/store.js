import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    dialog: true
  },
  mutations: {
    dialog (state, n){
      state.dialog = n;
    }
  },
  actions: {
    dialogShow ({commit}){
      commit('dialog', true)
    },
    dialogHide ({commit}){
      commit('dialog', false)
    }
  }
})
