import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{
      id: "",
      username: "",
      email: "",
      targetCollege:"",
      targetScore:0,
      currentScore:0
    },
    grade:[],
  },
  mutations: {
    setUser(state,user){
      state.userInfo = user
    },
    setGrade(state,grade){
      state.grade = grade
    }
  },
  actions: {
  },
  modules: {
  }
})
