import { ADD_TO_CART, REMOVE_FROM_CART } from "../types"

export const addToCart = (product) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice()

    let inCart = false

    cartItems.forEach(x=> {
        if (x._id === product._id) {
            inCart = true
            x.count++
        }
    })

    // add to cart with count 1
    if (!inCart) {
        cartItems.push({...product, count: 1})
    }

    // update cartItems
    dispatch({
        type: ADD_TO_CART,
        payload: {
            cartItems
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

export const removeFromCart = (product) => (dispatch, getState) => {
    // remove item of the same id
    const cartItems = getState().cart.cartItems.slice().filter(
        x=> x._id !== product._id
    )

    dispatch({type:REMOVE_FROM_CART, payload: {cartItems}})
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}