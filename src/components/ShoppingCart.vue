<template>
  <div class="shopping-cart">
    <ul>
      <li v-for="shirt in shirts" :key="shirt.text">
        {{ shirt.text }} + {{ shirt.size }} + {{ shirt.color }}
      </li>
    </ul>
    <p class="">
      {{ tempShirt.text }}
      {{ tempShirt.color }}
      <select
        v-if="isSizeSelectionVisible.value"
        name="size"
        v-model="selectedSize.value"
      >
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
      </select>
    </p>
    <button v-if="isSizeSelectionVisible.value" @click="addItemToCart">
      add item to cart
    </button>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { useCartStore } from "../store/cart.js";
import { useItemVisibilityStore } from "../store/itemVisibility.js";

const isAddButtonVisible = reactive({
  value: false,
});
const tempShirt = reactive({
  text: "",
  size: "",
  color: "",
});

const selectedSize = reactive({
  value: "M",
});

watch(selectedSize, (e) => {
  console.log("seleceted Size", selectedSize);
});

const isSizeSelectionVisible = reactive({
  value: false,
});

const shirts = useCartStore().cartList.list;

watch(useItemVisibilityStore(), (c) => {
  //this is in case other visibility items get changed,
  //so the UI doesnt needlessly update itself

  if (useItemVisibilityStore().isEditSizeVisible === isSizeSelectionVisible) {
    console.log("same VALUE,", useItemVisibilityStore().isEditSizeVisible);
    return;
  }
  isSizeSelectionVisible.value = useItemVisibilityStore().isEditSizeVisible;
});

const addItemToCart = () => {
  const selectedSizeRef = {
    value: selectedSize.value,
  };
  if (
    tempShirt.color !== "" &&
    (tempShirt.size = selectedSizeRef.value) !== "" &&
    tempShirt.text !== ""
  ) {
    const tempShirtRef = {
      color: tempShirt.color,
      size: tempShirt.size,
      text: tempShirt.text,
    };
    console.log("add item to cart", tempShirt);
    useCartStore().addCartItem(tempShirtRef);
    console.log(useCartStore().cartList.list);
    useItemVisibilityStore().isEditSizeVisible = false;
  }
};

watch(useCartStore(), (callback) => {
  if (useCartStore().proceedToEditShirtSize.value == false) return;
  const tempText = useCartStore().tempCartItem.text;
  const tempColor = useCartStore().tempCartItem.color;

  tempShirt.text = tempText;
  tempShirt.color = tempColor;
});
</script>
