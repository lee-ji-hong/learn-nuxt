<template>
  <div class="app">
    <main>
      <!-- :search-keyword="searchKeyword"
      @input="updateSearchKeyword" -->
      <SearchInput 
      v-model="searchKeyword"
      @search="searchProducts"
      />
      <ul>
        <li
          v-for="product in products" 
          :key="product.id" class="item flex"
          @click="moveToDetailPage(product.id)"
        >
          <img 
          class="product-image" 
          :src="product.imageUrl" 
          alt="product.name"
          />
          <p>{{product.name}}</p>
          <span>{{product.price}}</span>
        </li>
      </ul>
      <infinite-loading  spinner = "waveDots" @infinite="infiniteHandler"></infinite-loading>

      <div class="cart-wrapper">
        <button class="btn" @click="moveToCartPage">장바구니 바로가기</button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading' 
import SearchInput from '@/components/SearchInput.vue';
import { fetchProductsByKeyword } from '@/api/index'

const api = 'http://localhost:3000/products'
export default {
  
  name: 'IndexPage',
  components: { SearchInput,
  InfiniteLoading
  },

  async asyncData(){
    const response = await axios.get('http://localhost:3000/products')
  console.log(response)
  const products = response.data.map((item) => ({
    ...item,
    imageUrl: `${item.imageUrl}?random=${Math.random()}`,
  }))
  return {products}
   },
   data() {
    return {
      searchKeyword: '',
      page : 1,
     }
   },
  methods: {
    // 무한 스크롤
    infiniteHandler(test) {
      axios.get(api, {
        params: {
          page: this.page,
        },
      }).then((item ) => {
        if (item.length) {
          this.page += 1;
          this.products.push(...item);
          test.loaded();
        } else {
          test.complete();
        }
      });
    },

    // 상품목록 클릭이벤트
    moveToDetailPage(id) {
      this.$router.push(`detail/${id}`) // nuxt에서는 router를 내장 하고있어서 따로 선언해주지 않아도 된다. 
    },
    // api 호출이벤트
    async searchProducts() {
      const response = await fetchProductsByKeyword(this.searchKeyword)
      console.log(response.data)
      this.products = response.data.map((item) => ({
    ...item,
    imageUrl: `${item.imageUrl}?random=${Math.random()}`,
  }))
    },
    // cartPage로 이동
    moveToCartPage() {
      this.$router.push(`/cart`)
    },
  },
}
</script>
<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}
.product-image {
  width: 400px;
  height: 250px;
}
.app {
  position: relative;
}
.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 50px;
  right: 50px;
}
.cart-wrapper .btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}
</style>
