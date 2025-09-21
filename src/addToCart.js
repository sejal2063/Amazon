// import React from 'react'

import { getCardProducts } from "./getCardProducts"
import { updateCartValue } from "./updateCartValue"
getCardProducts()
export const addToCart = (event, id, stock) => {
    let arrLocalStorageProduct =  getCardProducts()

    let currentProdElem = document.querySelector(`#card${id}`)
    let quantity = currentProdElem.querySelector(".productQuantity").innerText
    let price = currentProdElem.querySelector(".productPrice").innerText
    console.log(quantity,price);
    
    price = price.replace("₹","")

    let existingProd = arrLocalStorageProduct.find(
        (currProd) => currProd.id === id
    )   

    if(existingProd && quantity > 1){
        quantity = Number(existingProd.quantity) + Number(quantity)
        price = Number(price * quantity);
        let updateCart = {id, quantity, price}
        updateCart = arrLocalStorageProduct.map((currProd)=>{
            return currProd.id === id ? updateCart : currProd
        })

        localStorage.setItem("cartProductLS", JSON.stringify(updateCart))
    }
    if(existingProd){
        return false;
    }
    price = Number(price * quantity)
    quantity = Number(quantity)

    arrLocalStorageProduct.push({id, quantity, price})
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct))
    updateCartValue(arrLocalStorageProduct)
}
