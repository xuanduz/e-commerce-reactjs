import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import productData from "../assets/fake-data/products";
import Filter from "../components/Filter";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";

var count = 6;

class Products extends Component {
  constructor() {
    super();
    this.state = {
      items: productData.getAllProducts(),
      listItem: productData.getProductsOrder(0, 6),
      hasMore: true,
      count: 6,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  filterBarClicked = () => {
    document
      .querySelector(".filter-responsive-sidebar")
      .classList.toggle("show-filter-responsive");
    document.querySelector(".backdrop-products").classList.toggle("hide");
  };

  handleFilter = (data) => {
    this.setState({
      items: data,
    });
  };

  render() {
    return (
      <div className="products-container">
        <div
          className="backdrop-products hide"
          onClick={() => this.filterBarClicked()}
        ></div>
        <div className="products row">
          <div className="products-left col-md-3 col-lg-2">
            <Filter
              data={this.state.items}
              handleFilter={(data) => this.handleFilter(data)}
            />
          </div>
          <div className="products-right col-md-9 col-lg-10 col-12">
            <div className="filter-responsive">
              <div className="row">
                <div
                  className="filter-responsive-btn"
                  onClick={() => this.filterBarClicked()}
                >
                  <b>Bộ lọc</b>
                  <i className="bx bx-filter-alt"></i>
                </div>
              </div>
              <div className="filter-responsive-sidebar">
                <Filter
                  data={this.state.items}
                  handleFilter={(data) => this.handleFilter(data)}
                />
              </div>
            </div>
            <div className="row list-products">
              {this.state.items &&
                this.state.items.length > 0 &&
                this.state.items.map((item, index) => (
                  <ProductCard
                    key={index}
                    img={item.image01}
                    name={item.title}
                    price={item.price}
                    path={item.slug}
                    grid=" col-xl-4 col-md-6 col-12"
                  />
                ))}
              {this.state.items.length === 0 && <h1>Không có sản phẩm nào</h1>}
            </div>
            {/* <InfiniteScroll
              dataLength={this.state.listItem.length}
              next={this.fetchMoreDate}
              hasMore={this.state.hasMore}
            >
              <div className="row list-products">
                {this.state.listItem.map((item, index) => (
                  <ProductCard
                    key={index}
                    img={item.image01}
                    name={item.title}
                    price={item.price}
                    grid=' col-xl-4 col-md-6 col-12'
                  />
                ))}
              </div>
            </InfiniteScroll> */}
            {/* {this.state.listItem.length === 18 ? null :
              <div className="row is-loading">
                <div className="loader"></div>
              </div>
            } */}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
