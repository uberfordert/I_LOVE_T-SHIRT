<template>
  <div class="shopping-cart">
    <ul>
      <li v-for="shirt in useCartStore().cartList.list" :key="shirt.text">
        qt:1 {{ shirt.text }} {{ shirt.size }} {{ shirt.color }}
        <button @click="deleteShirt(shirt)">x</button>
      </li>
    </ul>
    <div v-if="useItemVisibilityStore().isEditSizeVisible">
      {{ useCartStore().tempCartItem.text }}
      {{ useCartStore().tempCartItem.color }}
      <select name="size" v-model="useCartStore().tempCartItem.size">
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
      </select>
    </div>
    <button
      v-if="useItemVisibilityStore().isEditSizeVisible"
      @click="addItemToCart"
    >
      add item to cart
    </button>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { useCartStore } from "../store/cart.js";
import { useItemVisibilityStore } from "../store/itemVisibility.js";

const addItemToCart = () => {
  if (
    useCartStore().tempCartItem.color !== "" &&
    useCartStore().tempCartItem.size !== "" &&
    useCartStore().tempCartItem.text !== ""
  ) {
    const tempShirtRef = {
      color: useCartStore().tempCartItem.color,
      size: useCartStore().tempCartItem.size,
      text: useCartStore().tempCartItem.text,
    };
    useCartStore().addCartItem(tempShirtRef);
    console.log(useCartStore().cartList.list);
    useItemVisibilityStore().isEditSizeVisible = false;
  }
};

const deleteShirt = (shirt) => {
  useCartStore().cartList.list = useCartStore().cartList.list.filter(
    (t) => t !== shirt
  );
};

//Todo: try to change logic by only using the store
</script>
