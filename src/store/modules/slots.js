import axios from 'axios'
export default {
  actions: {
    async fetchSlots (context) {
      axios
        .get('http://dev.code-essence.eu/json/slots/')
        .then(response => {
          context.commit('updateSlots', response.data)
        })
    }
  },
  mutations: {
    updateSlots (state, slots) {
      state.slots = slots
    }
  },
  state: {
    slots: []
  },
  getters: {
    allSlots (state) {
      return state.slots
    }
  }
}
