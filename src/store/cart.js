import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useItemVisibilityStore } from "./itemVisibility";

export const useCartStore = defineStore("cart", () => {
  const tempCartItem = reactive({
    color: "",
    size: "M",
    text: "",
  });
  const cartList = reactive({
    list: [],
  });
  const proceedToEditShirtSize = reactive({
    value: false,
  });
  const cartListComplete = reactive({
    value: false,
  });

  function resetTempCartItem() {
    tempCartItem.size = "";
    tempCartItem.text = "";
    proceedToEditShirtSize.value = false;
  }
  function addCartItem(newCartItem) {
    console.log(newCartItem, "newCartItem, cart.js");
    cartList.list.push(newCartItem);
    resetTempCartItem();
    useItemVisibilityStore().isEditSizeVisible = false;
  }

  function deleteCartItem(oldCartItem) {
    cartList.value = cartList.value.filter((t) => t !== oldCartItem);
  }

  return {
    cartList,
    cartListComplete,
    proceedToEditShirtSize,
    addCartItem,
    deleteCartItem,
    tempCartItem,
    resetTempCartItem,
  };
});
