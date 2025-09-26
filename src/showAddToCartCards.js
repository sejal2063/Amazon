
import product from '../api/products.json'
import { getCardProducts } from './getCardProducts'
import { updateCartValue } from './updateCartValue';
import { updateCartProductTotal } from './updateCartProductTotal';

let cartProducts = getCardProducts()

let filterProducts = product.filter((currprod)=>{
    return cartProducts.some((currElem)=>currElem.id === currprod.id)
})

// console.log(filterProducts);

let cartElement = document.querySelector('#productCartContainer')

let templateContainer = document.querySelector('#productCartTemplate')

// import React from 'react'

export const showAddToCartCards = () => {
filterProducts.forEach((currprod) => {
    let { category, id, image, name, stock, price } = currprod;

    // Ensure quantity property exists
    let cartItem = cartProducts.find(item => item.id === id);
    if (!cartItem.quantity) cartItem.quantity = 1;

    const productClone = document.importNode(templateContainer.content, true);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;

    // Add quantity controls
    const stockElement = productClone.querySelector(".stockElement");
    stockElement.innerHTML = `
      <button class="decrease-qty">−</button>
      <span class="productQuantity">${cartItem.quantity}</span>
      <button class="increase-qty">+</button>
    `;

    // Increase quantity
    stockElement.querySelector(".increase-qty").addEventListener("click", () => {
      if (cartItem.quantity < stock) {
        cartItem.quantity += 1;
        localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));
        stockElement.querySelector(".productQuantity").textContent = cartItem.quantity;
        updateCartValue(cartProducts);
      }
    });

    // Decrease quantity
    stockElement.querySelector(".decrease-qty").addEventListener("click", () => {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));
        stockElement.querySelector(".productQuantity").textContent = cartItem.quantity;
        updateCartValue(cartProducts);
      }
    });

    // Remove from cart
    productClone
      .querySelector(".remove-to-cart-button")
      .addEventListener("click", () => {
        document.querySelector(`#card${id}`).remove();
        cartProducts = cartProducts.filter((item) => item.id !== id);
        localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));
  updateCartValue(cartProducts);
  updateCartProductTotal();
  console.log(`Product with id ${id} removed`);
      });

    cartElement.append(productClone);
});
}

showAddToCartCards()