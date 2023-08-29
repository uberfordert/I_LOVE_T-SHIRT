<script setup>
//TODO: add tailwind to project
import { reactive } from "vue";
import Footer from "./components/Footer.vue";
import Shirt from "./components/Shirt.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import PayPal from "./components/PayPal.vue";

const products = reactive({
  list: [],
});
</script>

<template>
  <div style="overflow-y: auto">
    <ShoppingCart></ShoppingCart>
    <Shirt></Shirt>
    <PayPal></PayPal>
    <Footer></Footer>
  </div>
</template>
