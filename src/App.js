// feature 1
import React from 'react';
import { Provider } from 'react-redux';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from "./data.json"
import store from "./store"

class App extends React.Component {
  constructor() {
    super()

    /* default state */
    /* get products list from data.json */
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) :
      [],
    }
  }

  createOrder = (order) => {
    alert(order.name)
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice()

    this.setState({cartItems: cartItems.filter(x=>x._id !== product._id)})
    
    // store current state
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x=>x._id !== product._id)))    
  }

  addToCart = (product) => {
    console.log("hello")

    // copy of cartItems list
    const cartItems = this.state.cartItems.slice();
    let inCart = false;

    cartItems.forEach(item => {
      if (item._id === product._id) { // same item added to cart
        item.count++
        inCart = true
      }
    })

    // push into the list
    if (!inCart) {
      cartItems.push({...product, count: 1})
    }

    // change the cartItems array in the state
    this.setState({ cartItems })

    // to store the state when the page is reloaded
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }

  sortProducts = (event) => {
    const sort = event.target.value
    console.log(sort)

    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) =>
        sort === "lowest" ? ((a.price > b.price) ? 1: -1):
        sort === "highest" ? ((a.price < b.price) ? 1: -1):

        //sort by id (time added) if not sorted by price
        ((a._id < b._id) ? 1: -1) 
      ),
    }))
  }

  filterProducts = (event) => {
    console.log(event.target.value)

    if (event.target.value === "") {
      // show all products
      this.setState({size: event.target.value, products:data.products})
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          // check if the size is in the availableSizes list
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
          ),
      })
    }
  } 

  render() {
    return (
      <Provider store ={store}>
        <div className = "grid-container">
          <header>
            <a href='/'>Shopping Cart</a>
          </header>

          <main>
            <div className="content">
              <div className="main">
                <Filter count={this.state.products.length}
                  size = {this.state.size}
                  sort = {this.state.sort}
                  filterProducts = {this.filterProducts}
                  sortProducts = {this.sortProducts}
                ></Filter>
                <Products 
                  products={this.state.products} 
                  addToCart={this.addToCart}>
                </Products>
              </div>
              <div className="sidebar">
                <Cart 
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>

          <footer>
            All rights reserved
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
