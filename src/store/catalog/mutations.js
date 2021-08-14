import {
  STORE_FETCHED_DATA,
  STORE_NEXT_PAGE_DATA,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  SET_LOADING_STATE,
  HAS_NEXT_PAGE,
  SET_PAGE_INITIAL,
  SET_NO_DATA,
  SET_TERM
} from './mutation-types'

export default {
  [SET_TERM]: (state, newTerm) => state.term = newTerm,
  [SET_PAGE_INITIAL]: (state) => state.currentPageNumber = 0,
  [STORE_FETCHED_DATA]: (state, { products, total}) => {
    state.products = products
    state.total = products.length ? total : 0
  },
  [SET_NO_DATA]: (state, op) => state.noResult = op,
  [STORE_NEXT_PAGE_DATA]: (state, nextPageProducts) => {
    state.products = [...state.products, ...nextPageProducts]
  },
  [NEXT_PAGE]: (state) => state.currentPageNumber += 1,
  [PREVIOUS_PAGE]: (state) => {
    if (state.currentPageNumber === 0) return
    state.currentPageNumber -= 1
    state.hasNextPage = true
  },
  [HAS_NEXT_PAGE]: (state, op) => state.hasNextPage = op,
  [SET_LOADING_STATE]: (state, loadingState) => {
    state.loading = loadingState
  }
}
