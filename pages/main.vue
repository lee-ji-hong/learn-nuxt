<template>
  <div>
<p>넉스트 시작하기</p>
<div>
  <ul>
    <li v-for="product in products" :key="product.id">
      <img :src="product.imageUrl" :alt="product.name"/>
      <p>{{product.name}}</p>
      <p>{{product.price}}</p>
    </li>
  </ul>
</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'MainPage',
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
      products: [],
    }
  },
}
</script>

<style>

</style>