// feature 1
import React from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import data from "./data.json"

class App extends React.Component {
  constructor() {
    super()

    /* default state */
    /* get products list from data.json */
    this.state = {
      products: data.products,
      size: "",
      sort: ""
    }
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
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>

        <footer>
          All rights reserved
        </footer>
      </div>
    );
  }
}

export default App;
