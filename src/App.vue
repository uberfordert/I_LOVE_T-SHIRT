<script setup>
import { reactive } from "vue";
import Footer from "./components/Footer.vue";
import Shirt from "./components/Shirt.vue";
import ShoppingCart from "./components/ShoppingCart.vue";

const products = reactive({
  list: [],
});
</script>

<template>
  <ShoppingCart></ShoppingCart>
  <Shirt></Shirt>
  <Footer></Footer>
</template>
