import product from '../api/products.json'
import { getCardProducts } from './getCardProducts'

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
    let{category, id, image, name, stock, price} = currprod

    const productClone = document.importNode(templateContainer.content, true);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;
     productClone
          .querySelector(".stockElement")
          .addEventListener("click", (event) => {
            homeQuantityToggle(event, id, stock);
          });
          productClone
          .querySelector(".remove-to-cart-button")
          .addEventListener("click", () => console.log('done')
           );
        cartElement.append(productClone);
})
}

showAddToCartCards()