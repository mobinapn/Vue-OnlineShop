<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useCartStore } from 'stores/cart.js';
import { QDialog, QBtn } from 'quasar'; 

const route = useRoute();
const productId = route.params.id;
const product = ref(null); 
const cartStore = useCartStore(); 

const dialogVisible = ref(false); 

function addProductToCart() {
  cartStore.addToCart(product.value);
  dialogVisible.value = true; 
  console.log(cartStore.cartItems);  
  
  setTimeout(() => {
    dialogVisible.value = false; 
  }, 3000);
}

const loading = ref(true);
const error = ref(null);

const fetchProduct = async () => {
  try {
    const response = await axios.get(`https://6763b5f717ec5852cae9ae16.mockapi.io/clothing/${productId}`);
    product.value = response.data;
  } catch (error) {
    error.value = 'خطا در دریافت اطلاعات محصول!';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProduct);
</script>

<template>
  <q-page class="q-pa-lg">    
    <div v-if="loading" class="text-center">در حال بارگذاری...</div>
    <div v-else-if="error" class="text-negative text-center">{{ error }}</div>
    <div v-else>
      <q-card class="q-ma-md" flat >
        <q-card-section horizontal>

          <q-card-section class="q-pt-sm ">
            <div class="text-h5 q-mt-sm q-mb-lg text-weight-bolder text-center">{{ product.name }}</div>
            <div class=" q-mt-lg q-mb-sm text-center">ویژگی های محصول</div>
            <q-separator/>
            <div class="text-caption text-black q-mb-md"> {{ product.description }} </div>
            <div class="text-h6 text-black text-center ">{{ product.price }} تومان</div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img :src="product.image" alt="Product Image" class="rounded-borders" />
          </q-card-section>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions>
          <q-btn flat class="full-width bg-light-green-1" icon="shopping_cart" @click="addProductToCart" label="افزودن به سبد خرید"  color="light-green-8" />
        </q-card-actions>
      </q-card>
    </div>

    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section class="text-center">
          <div class="text-h6 text-light-green-5">{{ product.name }} با موفقیت به سبد خرید اضافه شد</div>
        </q-card-section>
        <q-card-actions>
          <q-btn icon="check" color="light-green-4" @click="dialogVisible = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style scoped>
.q-card {
  max-width: 800px;
  margin: 0 auto;
}
</style>