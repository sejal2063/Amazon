// import React from 'react'

import { getCardProducts } from "./getCardProducts"
import { updateCartValue } from "./updateCartValue"
getCardProducts()
export const addToCart = (event, id, stock) => {
    let arrLocalStorageProduct = getCardProducts();
    let currentProdElem = document.querySelector(`#card${id}`);
    let quantity = parseInt(currentProdElem.querySelector(".productQuantity").innerText) || 1;
    let price = currentProdElem.querySelector(".productPrice").innerText;
    price = price.replace("₹", "");
    price = Number(price);

    let existingProd = arrLocalStorageProduct.find((currProd) => currProd.id === id);

    if (existingProd) {
        // Update quantity and price if already in cart
        if (existingProd.quantity + quantity <= stock) {
            existingProd.quantity += quantity;
        } else {
            existingProd.quantity = stock;
        }
        existingProd.price = price * existingProd.quantity;
        localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));
        updateCartValue(arrLocalStorageProduct);
        return;
    }

    // Add new product to cart
    let cartItem = {
        id,
        quantity: quantity,
        price: price * quantity
    };
    arrLocalStorageProduct.push(cartItem);
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));
    updateCartValue(arrLocalStorageProduct);
}
