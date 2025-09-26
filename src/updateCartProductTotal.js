// Updates the cart icon count (kept for compatibility)
export const updateCartValue = (cartProducts) => {
  const cartCountElement = document.querySelector("#cartValue");
  if (!cartCountElement) return;
  cartCountElement.textContent = cartProducts.length;
};

// Updates the cart summary totals (subtotal, tax, final total)
export const updateCartProductTotal = () => {
  const cartProducts = JSON.parse(localStorage.getItem("cartProductLS")) || [];
  let subTotal = 0;
  cartProducts.forEach(item => {
    // If item.price is per unit, use: (item.price * item.quantity)
    // If item.price is already total for that item, just sum it
    if (item.quantity && item.price) {
      subTotal += item.price * item.quantity;
    } else if (item.price) {
      subTotal += item.price;
    }
  });

  const tax = 50; // Fixed tax as per your UI
  const finalTotal = subTotal + tax;

  // Update DOM elements (using class selectors to match your HTML)
  const subTotalElem = document.querySelector(".productSubTotal");
  const finalTotalElem = document.querySelector(".productFinalTotal");
  if (subTotalElem) subTotalElem.textContent = subTotal;
  if (finalTotalElem) finalTotalElem.textContent = finalTotal;
};
// Call this function to initialize totals on page load
updateCartProductTotal();
