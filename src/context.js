import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data"; // import data of product from data.js

// context give two type to use Provider & Consumer type use anywhere in app
const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    /// use data here from storeproduct & make state
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };
// GET perticular item by id
  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };
  // add functionality like add to cart, details etc.
  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      }, // add another callback function to add total of item in cart
      () => {
        this.addTotal();
      }
    );
  };
  // open model details and close it
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  // increment cart
  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct); // lookingfor index
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotal();
      }
    );
  };
  // DECREMENT VALUES OF ITEM IN CART
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct); // lookingfor index
    const product = tempCart[index];

    product.count = product.count - 1;
    // if count =0 remove item else update count
    if(product.count === 0) {
        this.removeItem(id)
    } else {
        product.total = product.count * product.price;
        this.setState(
            () => {
              return { cart: [...tempCart] };
            },
            () => {
              this.addTotal();
            }
          );
    }
  };
  //  REMOVE ITEM
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id); // filter only cart that not match to remove id

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotal();
      }
    );
  };
  // CLEAR ALL ITEM IN CART
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts(); // set product refresh
        this.addTotal();
      }
    );
  };
  // ADD TOTAL OF ALL ITEM IN CART
  addTotal = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.18;
    const tax = parseFloat(tempTax.toFixed(2)); // add parse floating and fixed to 2 decimal
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          // use destructure from state
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          clearCart: this.clearCart,
          removeItem: this.removeItem
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
