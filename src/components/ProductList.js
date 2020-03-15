import React, { Component } from "react";
import Title from "./Title";
import Product from "./Product"; // pass this to the map function
// import {storeProducts} from '../data'   1.53
import { ProductConsumer } from "../context";

export default class ProductList extends Component {
  // state = {
  //     products: storeProducts
  // }
  render() {
    // console.log(this.state.products);

    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="our" title="products" />
            <div className="row">
              <ProductConsumer>
                {/* pass the value function and get the data from context and loop through */}
                {value => {
                  return value.products.map(product => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// state are declared in context for store.
// then go to product to display on page
