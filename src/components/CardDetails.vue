<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  product: Object,
});

const router = useRouter();

const goToProductPage = () => {
  router.push({ name: 'ProductDetail', params: { id: props.product.id } });
};
</script>

<template>
  <div class="q-pa-lg">
    <q-card class="col-12 col-md-4 no-shadow q-pa-sm ">
      <img :src="product.image" alt="Product image" class="q-mb-md" />
      <q-card-section>
        <div class="text-h6 q-mb-sm">{{ product.name }}</div>
        <div class="text-subtitle2">{{ product.price }} تومان</div>
      </q-card-section>
      <q-btn  class='cursor-pointer' color="primary" @click="goToProductPage">مشاهده محصول</q-btn>
    </q-card>
  </div>
</template>
