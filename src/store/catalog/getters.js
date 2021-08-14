import {
  GET_PRODUCTS,
  GET_CURRENT_PAGE_NUMBER,
  GET_CURRENT_PAGE_PRODUCTS,
  GET_CATALOG_TOTAL,
  GET_LOADING_STATE,
  GET_TOTAL,
  GET_RETURN_STATE,
  HAS_NEXT_PAGE,
  GET_CURRENT_TERM
} from './getter-types'

export default {
  [GET_CURRENT_TERM]: (state) => state.term,
  [GET_PRODUCTS]: (state) => state.products,
  [GET_CURRENT_PAGE_NUMBER]: (state) => state.currentPageNumber,
  [GET_CURRENT_PAGE_PRODUCTS]: (state, getter) => {
    const curPage = getter.GET_CURRENT_PAGE_NUMBER
    return state.products.slice(15 * curPage, 15 + (15 * curPage))
  },
  [GET_CATALOG_TOTAL]: (state) => state.products.length,
  [GET_LOADING_STATE]: (state) => state.loading,
  [HAS_NEXT_PAGE]: (state) => state.hasNextPage,
  [GET_RETURN_STATE]: (state) => state.noResult,
  [GET_TOTAL]: (state) => state.total
}
