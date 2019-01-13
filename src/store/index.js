import Vuex from 'vuex'
import Vue from 'vue'
import storage from 'good-storage'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: JSON.stringify(storage.get('user'))? storage.get('user'): {},
    currentTab: [],
    isShow: false,
    routeIndex: 0,
    notReadNum: 0
  },
  mutations: {
    setCurrentTab(state, tab) {
      state.currentTab.push(tab)
    },
    setUser(state, user) {
      state.user = user
    },
    changeRouterIndex(state, index) {
      state.routeIndex = index
    },
    clearUser(state) {
      state.user = {}
    },
    setTopic(state, topic) {
      state.topic = topic
    },
    setShow(state, isShow) {
      state.isShow = isShow
    },
    setNotReadNum(state, num) {
      state.notReadNum = num
    }
  },
  actions: {
  }
})

export default store