<template>
  <a
    class="c-product-card"
    :href="href"
    target="_blank"
  >
  <div>
    <img
      :class="'c-product-card__image' + (loaded ? ' loaded' : '')"
      :alt="title"
      :src="imageUrl"
      @load="loaded = true"
    />
    <div class="c-product-card__info__priceTag">
      <span :class="'currentPrice' + (onSale ? ' onSale' : '')" >R$ {{ currentPrice }}</span>
      <span class="originalPrice" v-if="onSale">R$ {{ originalPrice }}</span>
    </div>
    <span class="c-product-card__info__offPrice" v-if="onSale">
      {{ offPrice }}% off
    </span>
  </div>
  </a>
</template>

<script>
  import { getImageUrl, IMAGE_PRESETS } from '@/tools/get-image-url'

  export default {
    props: {
      imageId: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      path: {
        type: String,
        required: true
      },
      currentPrice: {
        type: Number,
        required: true
      },
      originalPrice: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        imageUrl: getImageUrl(this.imageId, IMAGE_PRESETS.product.card),
        onSale: this.currentPrice !== this.originalPrice,
        offPrice: 100 - ((this.currentPrice / this.originalPrice) * 100).toFixed(),
        loaded: false
      }
    },
    methods: {

    },
    computed: {
      href() {
        return `https://www.enjoei.com.br/p/${this.path}`
      }
    }
  }
</script>

<style scoped lang="scss">
.c-product-card {
  display: block;
  position: relative;
}
.c-product-card__image {
  border-radius: 3px;
  background: var(--color-gray-3);
  width: 100%;
  aspect-ratio: 1;
  opacity: 0;
}
.loaded {
  animation: enterAnimation 0.3s ease forwards;
}
.c-product-card__info,
.c-product-card__info__priceTag,
.c-product-card__info__offPrice {
  position: absolute;
}
.c-product-card__info__priceTag {
  display: inline-block;
  width: fit-content;
  white-space: nowrap;
  padding: 2px 4px;
  background: white;
  border-radius: 3px;
  bottom: 7px;
  left: 2px;
}
.originalPrice,
.currentPrice,
.c-product-card__info__offPrice {
  display: inline;
  font-size: 0.8em;
}
.currentPrice {
  font-weight: bold;
  color: var(--color-gray-5);
}
.onSale {
  color: var(--color-pink);
}
.originalPrice {
  position: relative;
  margin-left: 5px;
  color: var(--color-gray-4);
  text-decoration: line-through;
}

.c-product-card__info__offPrice {
  background: var(--color-pink);
  color: #fff;
  padding: 2px 4px;
  border-radius: 3px;
  top: 2px;
  right: 2px;
}
</style>
