<template>
  <div class="mx-6 my-6 items-center">
    <PayPalButton
      v-if="
        !usePaypalStore().succesfulPurchase &&
        useCartStore().cartList.list.length
      "
      :amount="amount"
    />
    <div v-if="usePaypalStore().succesfulPurchase">Kauf abgeschlossen</div>
  </div>
  <h1>Payment Options:</h1>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useCartStore } from "../store/cart";
import { usePaypalStore } from "../store/paypal";
import PayPalButton from "./PayPalButton.vue";

const shirtPrice = ref(25.0); //Todo: Replace with a constant
//Todo: find a way to clean this up,
//it works but is very scuffed
const amount = ref(useCartStore().cartList.list.length * shirtPrice);

onMounted(() => {
  usePaypalStore().succesfulPurchase = false;
});
</script>
