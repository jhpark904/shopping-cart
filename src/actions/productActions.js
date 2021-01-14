import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE } from "../types"
import { FILTER_PRODUCTS_BY_SIZE } from "../types"

export const fetchProducts = () => async (dispatch) => {

    //get data from server
    const res = await fetch("/api/products")
    const data = await res.json()

    //products
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    })
}

export const filterProducts = (products, size) => (dispatch) => {
    dispatch ({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items: size === "" ? products:
            // filter by size
            products.filter((x) => x.availableSizes.indexOf(size)>=0)
        }
    })
}

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
    const sortedProducts = filteredProducts.slice()
    // sort by id
    if (sort === "latest") {
        sortedProducts.sort((a,b) => a._id > b._id ? 1: -1)

    } else {    //sort products by price
        sortedProducts.sort((a,b) => sort === "lowest" ?
        a.price > b.price ? 1: -1
        : a.price > b.price ? -1: 1)
    }

    dispatch ({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts,
        },
    })
}