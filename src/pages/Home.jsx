import React, { Component } from 'react';

import Policy from '../components/Policy';
import productData from '../assets/fake-data/products.js';

import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="home">
        <Carousel />
        <Policy />
        <section className="section-sale-product">
          <h2 className='section-title'>SALE UPTO 66%</h2>
          <div className="section-sale-product-banner">
            <img src={require('../assets/images/banner_hangngay_1.jpg')} alt="" />
          </div>
          <div className="section-sale-product-card row">
            {productData.getProducts(4).map((item, index) => (
              <ProductCard
                type='sale-product'
                key={index}
                img={item.image01}
                name={item.title}
                price={item.price}
                path={item.slug}
                grid=' col-xl-3 col-md-6 col-12'
              />
            ))}
          </div>
        </section>

        <section className="section-new-product section-sale-product">
          <h2 className='section-title'>Sản phẩm mới</h2>
          <div className="section-new-product-banner section-sale-product-banner">
            <img src={require('../assets/images/banner_2.jpg')} alt="" />
          </div>
          <div className="section-new-product-card section-sale-product-card row">
            {productData.getProducts(8).map((item, index) => (
              <ProductCard
                type='new-product'
                key={index}
                img={item.image01}
                name={item.title}
                price={item.price}
                path={item.slug}
                grid=' col-xl-3 col-md-6 col-12'
              />
            ))}
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
