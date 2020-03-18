import axios from 'axios'
export default {
  actions: {
    async fetchPayTable (context) {
      axios
        .get('http://dev.code-essence.eu/json/slots/?fetch=paytable')
        .then(response => {
          context.commit('updatePayTable', response.data)
        })
    }
  },
  mutations: {
    updatePayTable (state, paytable) {
      state.paytable = paytable
    }
  },
  state: {
    paytable: []
  },
  getters: {
    payTables (state) {
      return state.paytable
    }
  }
}
