import axios from 'axios'
import { FETCH_DATA, FETCH_NEXT_PAGE_DATA } from './action-types'

const get_data = async (term, cursor = '') => {
  return await axios.post('https://enjusearch.enjoei.com.br/graphql-search', {
    query: `
      query searchProducts(
        $term: String!,
        $first: Int,
        $after: String
      ) {
        search(products: {
          term: $term
        }) {
          products(first: $first, after: $after) {
            total
            edges {
              cursor
              node {
                id
                path
                photo {
                  image_public_id
                }
                title {
                  name
                }
                brand {
                  displayable_name
                }
                price {
                  original
                  current
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      term,
      first: 15,
      after: cursor
    }
  })
}

function parseData(response) {
  response = response.data.data.search.products
  const products = response.edges.map(prod => {
    prod.node.cursor = prod.cursor
    return prod.node
  })
  const total = response.total
  return {
    products,
    total
  }
}

export default {
  [FETCH_DATA]: ({ dispatch, commit, getters }, term) => {
    commit('SET_LOADING_STATE', true)
    commit('SET_TERM', term)
    get_data(getters.GET_CURRENT_TERM).then(r => {
      const { products, total } = parseData(r)
      if (products.length === 0) {
        commit('SET_NO_DATA', true);
      } else if (products.length < 15) {
        commit('HAS_NEXT_PAGE', false)
      } else {
        commit('HAS_NEXT_PAGE', true)
      }
      commit('STORE_FETCHED_DATA', { products: products, total: total })
      commit('SET_LOADING_STATE', false)
    }).catch(e => {
      console.log(e.message);
    })
  },
  [FETCH_NEXT_PAGE_DATA]: ({ dispatch, commit, getters }) => {
    const isLastPage = ((getters.GET_CURRENT_PAGE_NUMBER + 1) * 15 < getters.GET_CATALOG_TOTAL);
    if (isLastPage) {
      commit('NEXT_PAGE')
    } else {
      commit('SET_LOADING_STATE', true)
      if (getters.GET_TOTAL === getters.GET_CATALOG_TOTAL.length) {
        commit('HAS_NEXT_PAGE', false)
      }
      let catalog = getters.GET_CURRENT_PAGE_PRODUCTS
      let cursor = catalog[catalog.length - 1].cursor
      get_data(getters.GET_CURRENT_TERM, cursor).then(r => {
        const { products } = parseData(r)
        commit('STORE_NEXT_PAGE_DATA', products)
        if (products.length < 15) {
          commit('HAS_NEXT_PAGE', false)
        }
        commit('NEXT_PAGE')
        commit('SET_LOADING_STATE', false)
      }).catch(e => console.log(e.message))
    }
    const hasNextPage = ((getters.GET_CURRENT_PAGE_NUMBER + 2) * 15 < getters.GET_TOTAL);
    if (!hasNextPage) commit('HAS_NEXT_PAGE', false)
  }
}
