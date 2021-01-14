import { FETCH_PRODUCTS } from "../types";

// update information in redux store
export const productsReducer = (state = {}, action) => {

    switch(action.type) {
        case FETCH_PRODUCTS:
            return {items: action.payload}
        default:
            return state
    }
}