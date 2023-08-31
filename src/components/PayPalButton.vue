<template>
  <div ref="paypalButtonContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useCartStore } from "../store/cart";
import { usePaypalStore } from "../store/paypal";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const paypalButtonContainer = ref(null);

onMounted(() => {
  const script = document.createElement("script");
  script.src =
    "https://www.paypal.com/sdk/js?client-id=" +
    PAYPAL_CLIENT_ID +
    "&disable-funding=credit,card,eps,sofort";
  script.async = true;
  script.onload = initPayPalButton;
  document.body.appendChild(script);
});

const initPayPalButton = () => {
  paypal
    .Buttons({
      style: {
        color: "black",
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                name: "Uberforder Shirt",
                value: 25 * useCartStore().cartList.list.length,
              },
            },
          ],
        });
      },
      onApprove: (data, actions) => {
        //Details contains information about the user
        //Todo: after purchase protocol: e.g. send email to user...
        actions.order.capture().then((details) => {
          console.log(details);
          usePaypalStore().succesfulPurchase = true;
        });
      },
    })
    .render(paypalButtonContainer.value);
};
</script>
