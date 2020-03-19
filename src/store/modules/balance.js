export default {
  actions: {
    fetcBalance (context) {
      // initial loading of ballance from backend
      if (!context.state.balance.inited) {
        context.commit('updateBalance', { balance: 10, type: 'initial' })
      }
    },
    changeBalance (context, event) {
      const newBallance = context.state.balance.total + event.diff
      context.commit('updateBalance', { balance: newBallance >= 0 ? newBallance : 0, type: event.type })
    }
  },
  mutations: {
    updateBalance (state, event) {
      state.balance.inited = true
      state.balance.total = event.balance
      state.balance.records.push({ changes: event.balance, type: event.type })
    }
  },
  state: {
    balance: {
      inited: false,
      total: 0,
      records: []
    }
  },
  getters: {
    balanceRecords (state) {
      return state.balance
    },
    currentBalance (state) {
      return state.balance.total
    }
  }
}
