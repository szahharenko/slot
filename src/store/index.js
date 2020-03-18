import Vue from 'vue'
import Vuex from 'vuex'
import slots from './modules/slots'
import payTable from './modules/paytable'
import balance from './modules/balance'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    slots,
    payTable,
    balance
  }
})

export default store
