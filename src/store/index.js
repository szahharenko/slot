import Vue from 'vue'
import Vuex from 'vuex'
import slots from './modules/slots'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    slots
  }
})

export default store
