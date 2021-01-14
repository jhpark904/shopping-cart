// feature 1
import React from 'react';
import { Provider } from 'react-redux';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import store from "./store"

class App extends React.Component {
  constructor() {
    super()

    /* default state */
    this.state = {
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
                <Filter></Filter>
                <Products addToCart={this.addToCart}></Products>
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
