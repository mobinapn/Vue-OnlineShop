<script setup>
import NavbarShop from 'src/components/NavbarShop.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <NavbarShop />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
