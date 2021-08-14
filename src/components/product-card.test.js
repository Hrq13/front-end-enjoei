import { shallowMount } from '@vue/test-utils'
import vProductCard from '@/components/product-card.vue'

describe('ProductCard', () => {
  it('mounts', () => {
    const wrapper = shallowMount(vProductCard, { propsData: {
      imageId: '',
      title: '',
      path: '',
      currentPrice: 0,
      originalPrice: 0
    }})

    expect(wrapper.vm).toBeTruthy()
  })
})
