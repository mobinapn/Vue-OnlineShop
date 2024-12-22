<script setup>
import { ref } from 'vue';
const slide = ref(1);
</script>

<template>
  <div >
    <q-carousel 
      animated
      v-model="slide"
      arrows
      infinite
      autoplay
     class="carousel"
      
    >
    <q-carousel-slide :name="1" img-src="/assets/999ef3c84f70450732755b9f6fd07fbd.jpg"></q-carousel-slide>
    <q-carousel-slide :name="2" img-src="/assets/3641eb33b62d86e1e9474d55a261ed87.jpg"></q-carousel-slide>
    <q-carousel-slide :name="3" img-src="/assets/fa9d146ddccabd4c76bd5317c12d202d.jpg"></q-carousel-slide>

    </q-carousel>
  </div>
</template>
<style scoped>
.carousel{
  height: 40rem
}
</style>
 



