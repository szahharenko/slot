export default {
  actions: {
    fetcBalance (context) {
      // initial loading of ballance from backend
      context.commit('updateBalance', { balance: 10, type: 'initial' })
    },
    changeBalance (context, event) {
      const newBallance = context.state.balance.total + event.diff
      context.commit('updateBalance', { balance: newBallance, type: event.type })
    }
  },
  mutations: {
    updateBalance (state, event) {
      state.balance.total = event.balance
      state.balance.records.push({ changes: event.balance, type: event.type })
    }
  },
  state: {
    balance: {
      total: 0,
      records: []
    }
  },
  getters: {
    balanceChanges (state) {
      return state.balance.records
    },
    currentBalance (state) {
      return state.balance.total
    }
  }
}
