<template>
  <div>
    <div class="search-bar">
      <span class="search-bar__result">
        {{ total > 1 ? total + ' produtos encontrados' :
           total === 1 ? total + ' produto encontrado' :
           total === 0 ? 'nenhum produto encontrado' : ''
        }}
      </span>
      <span class="search-bar__queryInput">
        <button
          class="clearQuery"
          aria-label="limpar busca"
          @click="term === '' || clearQuery() || fetchData()"
        >
          limpar busca
        </button>
        <span class="query-span">
          <input
            id="queryInput"
            ref="query"
            @keyup.enter="fetchData()"
            type="text"
            placeholder="buscar"
            v-model="term"
            aria-label="digite o produto que busca aqui"
          >
          <span class="queryIcon" aria-label="buscar" @click="fetchData()"></span>
        </span>
      </span>
    </div>
    <div class="catalog" v-if="!loading && products && products.length && !noResult">
      <div
        v-for="product in products"
        :key="product.id"
      >
        <product-card
          class="catalog__product"
          :imageId="product.photo.image_public_id"
          :title="product.title.name"
          :path="product.path"
          :originalPrice="product.price.original"
          :currentPrice="product.price.current"
        />
      </div>
    </div>
    <div class="pagination-btns" v-if="!loading && products && products.length && !noResult">
      <span :class="'span-prev-page' + (currentPage === 0 ? ' no-page' : '')">
        <button
          id="previous-page"
          class="previous-page"
          aria-label="ir para página anterior"
          @click="currentPage > 0 && displayPreviousPage()"
          :disabled="currentPage === 0"
        >
          <span class="previous-page-icon"></span>
          <span>anterior</span>
        </button>
      </span>
      <span :class="'span-next-page' + (hasNextPage ? '' : ' no-page')">
        <button
          id="next-page"
          class="next-page"
          aria-label="ir para próxima página"
          @click="hasNextPage && displayNextPage()"
          :disabled="!hasNextPage"
        >
          <span class="next-page-icon"></span>
          <span>próxima</span>
        </button>
      </span>
    </div>
    <div class="loading-catalog" v-if="loading && !noResult">
      <div
        v-for="n of 15"
        :key="n"
      >
        <div class="loading-catalog__card"></div>
      </div>
    </div>
    <div class="no-result" v-if="noResult">
      <p class="no-result__title">ué, não encontramos nadinha</p>
      <p class="no-result__subtitle">que tal recomeçar do começo?</p>
      <button class="no-result__btn" @click="clearQuery() || fetchData()">limpar busca</button>
      <span class="no-result__img" ></span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ProductCard from '@/components/product-card.vue'

const {mapActions, mapGetters, mapMutations} = createNamespacedHelpers('catalog')

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      after: '',
      term: ''
    }
  },
  methods: {
    ...mapActions({
      getData: 'FETCH_DATA',
      goToNextPage:'FETCH_NEXT_PAGE_DATA'
    }),
    ...mapMutations({
      nextPage: 'NEXT_PAGE',
      toFirstPage: 'SET_PAGE_INITIAL',
      toPreviousPage: 'PREVIOUS_PAGE',
      setNoResult: 'SET_NO_DATA',
      setTerm: 'SET_TERM'
    }),
    clearQuery() {
      this.term = ''
    },
    fetchData() {
      this.setNoResult(false),
      this.getData(this.term);
      this.toFirstPage()
    },
    displayNextPage() {
      this.goToNextPage(this.term)
      window.scrollTo(0,0)
    },
    displayPreviousPage() {
      this.toPreviousPage()
      window.scrollTo(0,0)
    }
  },
  computed: {
    ...mapGetters({
      total:'GET_TOTAL',
      products: 'GET_CURRENT_PAGE_PRODUCTS',
      currentPage: 'GET_CURRENT_PAGE_NUMBER',
      loading: 'GET_LOADING_STATE',
      hasNextPage: 'HAS_NEXT_PAGE',
      noResult: 'GET_RETURN_STATE'
    })
  },
  created() {
    this.fetchData();
    this.$nextTick(() => this.$refs.query.focus());
  }
}
</script>
<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 5px 0;
}

.search-bar__result {
  font-size: 1em;
  font-weight: bold;
}

.clearQuery {
  background: #fff;
  border: 0;
  margin-right: 5px;
  color: var(--color-pink);
  cursor: pointer;
  transition: all .2s;
}

.clearQuery:hover {
  background: var(--color-gray-2);
}

.query-span {
  position: relative;
}

#queryInput {
  border: 1px solid var(--color-border);
  box-sizing: border-box;
  padding: 20px 40px 20px 8px;
  width: 250px;
  height: 30px;
  color: var(--color-text-3);
  border-radius: 3px;
  font-weight: var(--font-weight-semi-bold);
}

#queryInput:focus {
  outline: 0;
}

.query-span {
  width: 100%;
  box-sizing: border-box;
}

.queryIcon {
  position: absolute;
  background-image: url("../assets/search-icon.svg");
  width: 25px;
  aspect-ratio: 1;
  right: 10px;
  bottom: -3px;
  cursor: pointer;
}

.catalog, .loading-catalog {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 1.7%;
  grid-row-gap: 0.8em;
  grid-auto-rows: auto;
}

.loading-catalog__card::after {
  content: '';
  display: block;
  width: 100%;
  aspect-ratio: 1;
  background:rgb(238, 238, 238);
}

.catalog__product {
  display: block;
  animation: enterAnimation 0.5s ease;
}

.no-result__title {
  margin: 1em 0 .3em 0;
  margin-top: 1em;
  font-size: 1.8em;
  text-align: center;
  font-weight: var(--font-weight-extra-bold);
}

.no-result__subtitle {
  text-align: center;
  margin: 0;
}

.no-result__btn {
  display: block;
  border: 0;
  background: var(--color-pink);
  width: 150px;
  padding: 1em 1.7em;
  color: #fff;
  border-radius: 3px;
  font-weight: var(--font-weight-semi-bold);
  margin: 2em auto 3.5em;
  cursor: pointer;
}

.no-result__img {
  display: block;
  background-image: url('../assets/blank-slate.png');
  background-repeat: no-repeat;
  background-size: 410px;
  background-position: center;
  width: 80%;
  margin: auto;
  height: 260px;
}

.pagination-btns {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2em 0;
  padding: 0 2em;
  box-sizing: border-box;
}

.next-page, .previous-page {
  background: #fff;
  border: 1px solid var(--color-border);
  color: var(--color-pink);
  font-weight: var( --font-weight-semi-bold);
  cursor: pointer;
}

.next-page {
  margin-left: 33px;
}

.previous-page {
  margin-right: 33px;
}

.next-page, .previous-page {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  width: 120px;
  justify-content: space-between;
}

.next-page {
  flex-direction: row-reverse;
}

.previous-page-icon, .next-page-icon {
  display: block;
  width: 20px;
  height: 20px;
}

.previous-page-icon {
  background: url(../assets/arrow-left-icon.svg) no-repeat;
}

.next-page-icon {
  background: url(../assets/arrow-right-icon.svg) no-repeat;
}

.no-page {
  filter: grayscale(100) opacity(0.7);
}

.no-page > .previous-page, .no-page > .next-page  {
  cursor: default;
}

@media screen and (max-width: 840px) {
  .catalog, .loading-catalog {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 635px) {
  .search-bar {
    display: block;
  }

  .search-bar__result, .clearQuery {
    display: none;
  }

  #queryInput {
    box-sizing: border-box;
    width: 100%;
    height: 45px;
  }

  .catalog, .loading-catalog {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
  }

  .pagination-btns {
    display: flex;
    justify-content: space-between;
    margin: 1.5em 0;
    padding: 0;
  }
}
</style>
