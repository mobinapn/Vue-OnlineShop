<script setup>
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart.js'; 

const router = useRouter();
const cartStore = useCartStore();

function goToProductManagement() {
  router.push({ name: 'ProductManagment' });
}
function goToHomePage() {
  router.push({ name: 'HomePage' });
}

function removeItemFromCart(productId) {
  cartStore.removeFromCart(productId); 
}
</script>

<template>
  <q-toolbar class="bg-white text-dark border">
    <div class="row items-center">
      <q-btn flat class="q-ml-sm" color="dark" label="عضویت" />
      <q-separator vertical class="q-mx-xs" color="black" />
      <q-btn flat class="q-ml-sm" color="dark" label="وارد شوید" />
    </div>

    <q-toolbar-title class="text-center">
      <q-btn  flat class="text-h4"  @click="goToHomePage">فروشگاه زیورآلات</q-btn >
    </q-toolbar-title>

    <div class="row items-center">
      <q-icon name="search" class="text-dark q-px-sm" size="md" />
      <q-btn-dropdown flat icon="shopping_cart" color="dark" size="md" label="سبد خرید">
        <q-list>
          <q-item
            v-for="product in cartStore.cartItems"
            :key="product.id"
            clickable
            class="q-py-sm"
          >
            <q-item-section avatar>
              <q-img :src="product.image" alt="product.name" class="rounded" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ product.name }}</q-item-label>
              <q-item-label caption>{{ product.price }} تومان</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                dense
                icon="delete"
                color="red"
                @click.stop="removeItemFromCart(product.id)"
              />
            </q-item-section>
          </q-item>
          <q-item v-if="cartStore.cartItems.length === 0" class="q-py-sm text-center">
            <q-item-section>
              <q-item-label caption class="text-grey">سبد خرید خالی است</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </q-toolbar>

  <q-toolbar class="bg-primary text-dark row items-center justify-center text-center bordered">
    <div class="q-mx-md">
      <q-btn-dropdown flat class="q-ml-sm text-center" label="دسته بندی محصولات">
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section/>
              <q-item-label />انگشتر
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section/>
              <q-item-label/>دستبند
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section/>
              <q-item-label/>گردنبند
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn flat class="q-ml-sm" color="dark" @click="goToProductManagement" label="مدیریت محصولات" />
      <q-btn flat class="q-ml-sm" color="dark" label="تماس با ما" />
      <q-btn flat class="q-ml-sm" color="dark" label="درباره ی ما" />
    </div>
  </q-toolbar>
</template>
