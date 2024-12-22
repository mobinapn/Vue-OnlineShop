<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart.js'; 
import CardDetails from './CardDetails.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const products = ref([]); 
const loading = ref(true); 
const error = ref(null); 
const cartStore = useCartStore(); 
const router = useRouter(); 


const fetchProducts = async () => {
  try {
    const response = await axios.get('https://6763b5f717ec5852cae9ae16.mockapi.io/clothing');
    products.value = response.data; 
  } catch (error) {
    error.value = 'خطا در دریافت اطلاعات!';
  } finally {
    loading.value = false; 
  }
};


const goToProductPage = (productId) => {
  router.push({ name: 'ProductDetail', params: { id: productId } });
};


onMounted(fetchProducts);
</script>

<template>
  <div>
    <div class="text-h5 text-center q-py-xl">جدیدترین ها</div>
    <div v-if="loading" class="text-h5 text-center q-mx-auto">در حال بارگذاری...</div>
    <div v-else-if="error" class="text-negative q-mx-auto">{{ error }}</div>
    <div v-else class="row q-col-gutter-x-md q-col-gutter-y-md text-center">
      <CardDetails
        v-for="product in products"
        :key="product.id"
        :product="product"
        @item-clicked="goToProductPage"
        @add-to-cart="cartStore.addToCart"
        class="col-12 col-md-4"
      />
    </div>
  </div>
</template>
