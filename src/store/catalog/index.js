import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state: {
    products: [],
    loading: true,
    noResult: false,
    currentPageNumber: 0,
    hasNextPage: true,
    total: 0,
    term: ''
  },
  getters,
  mutations,
  actions
}
