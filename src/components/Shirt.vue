<template>
  <!-- The main container for the shirt customization -->
  <div class="shirt">
    <!-- Container for the switch to toggle between shirt colors -->
    <div class="switch-container">
      <label class="switch">
        <input @click="switchClick" type="checkbox" id="image-switch" />
        <span class="slider round"></span>
      </label>
    </div>
    <!-- Container for the shirt image, text input, and button -->
    <div class="shirt-image-container">
      <img id="image-center-toggle" :src="shirtUrl.value" alt="PNG Image" />
      <input
        v-model="useCartStore().tempCartItem.text"
        :class="shirtTextColor.value"
        type="text"
        id="interactive-text"
        placeholder="Enter text here"
      />
      <button @click="addItem">Add Item</button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, reactive, watch } from "vue";
import { useCartStore } from "../store/cart.js";
import { useItemVisibilityStore } from "../store/itemVisibility.js";

// Constants for shirt color modes and URLs
const SHIRT_DARK_MODE = "shirt-image-text-darkmode";
const SHIRT_LIGHT_MODE = "shirt-image-text-lightmode";
const WHITE_SHIRT_URL = "src/assets/images/i_love-white.png";
const BLACK_SHIRT_URL = "src/assets/images/i_love-black.png";

// Reactive objects for shirt customization
const shirtTextColor = reactive({
  value: SHIRT_LIGHT_MODE,
});

const shirtUrl = reactive({
  value: WHITE_SHIRT_URL,
});

// Hook to run before mounting the component
onBeforeMount(() => {
  // Hide the edit size element
  useItemVisibilityStore().isEditSizeVisible = false;
  // Initialize temporary cart item color
  useCartStore().tempCartItem.color = "white";
  // Set default shirt color
});

// Function to handle the switch toggle between shirt colors
const switchClick = () => {
  if (shirtUrl.value === BLACK_SHIRT_URL) {
    // Switch to white shirt
    useCartStore().tempCartItem.color = "white";
    shirtTextColor.value = SHIRT_LIGHT_MODE;
    shirtUrl.value = WHITE_SHIRT_URL;
  } else {
    // Switch to black shirt
    useCartStore().tempCartItem.color = "black";
    shirtTextColor.value = SHIRT_DARK_MODE;
    shirtUrl.value = BLACK_SHIRT_URL;
  }
};

// Function to add an item to the cart or initiate size editing
const addItem = () => {
  if (useCartStore().tempCartItem.text === "") {
    // If the text input is empty, add a default item to the cart
    console.log("Empty shirt");
  } else {
    // If text input is not empty, prepare the cart item for editing size
    // Make the edit size element visible
    useItemVisibilityStore().isEditSizeVisible = true;
  }
};
</script>
