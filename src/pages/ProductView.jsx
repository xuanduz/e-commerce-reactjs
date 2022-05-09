import { useNavigate } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";

import productData from "../assets/fake-data/products";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
// import Toast from '../components/Toast';

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.description = React.createRef();
    this.readMoreBtn = React.createRef();
    this.collapseBtn = React.createRef();
    this.inputAmount = React.createRef();
    this.state = {
      oneProduct: productData.getProductBySlug(this.props.slugPath)[0],
      randomProduct: productData.getProducts(4),
      imageDetail: null,
      amount: 1,
      size: null,
      color: null,
      navigateState: null,
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  componentDidUpdate = () => {
    localStorage.setItem("CART-ITEMS", JSON.stringify(this.props.dataRedux));
  };

  handleReadMore = () => {
    this.description.current.classList.toggle("show-text");
    if (this.description.current.classList.contains("show-text")) {
      this.readMoreBtn.current.classList.add("hide");
      this.collapseBtn.current.classList.remove("hide");
    } else {
      this.readMoreBtn.current.classList.remove("hide");
      this.collapseBtn.current.classList.add("hide");
    }
  };

  handleDecreaseBtn = () => {
    this.setState({
      amount: this.state.amount - 1 > 0 ? this.state.amount - 1 : 1,
    });
  };

  handleIncreaseBtn = () => {
    this.setState({
      amount: this.state.amount + 1,
    });
  };

  handleChangeAmount = () => {
    if (this.inputAmount.current.value) {
      this.setState({
        amount: parseInt(this.inputAmount.current.value),
      });
    }
  };

  checkAddToCart = (str) => {
    if (this.state.color === "" || this.state.color === null) {
      str += " màu sắc";
    }
    if (this.state.size === "" || this.state.size === null) {
      if (str !== "Lỗi") {
        str += ", kích thước ";
      } else {
        str += " kích thước";
      }
    }
    if (this.state.amount <= 0 || this.state.amount === "") {
      if (str !== "Lỗi") {
        str += ", số lượng ";
      } else {
        str += " số lượng";
      }
    }
    if (str === "Lỗi") {
      const item = this.state.oneProduct;
      const temp = {
        slug: item.slug,
        image: item.image01,
        name: item.title,
        price: item.price,
        color: this.state.color,
        size: this.state.size,
        amount: this.state.amount,
      };
      return temp;
    } else {
      return str;
    }
  };

  handleAddToCart = () => {
    var str = "Lỗi";
    let result = this.checkAddToCart(str);
    if (typeof result === typeof "sting") {
      alert(result);
    } else {
      alert("Success");
      this.props.addToCartRedux(result);
    }
  };

  handleChangePath = (slugPath) => {
    this.setState({
      oneProduct: productData.getProductBySlug(slugPath)[0],
    });
    window.scrollTo(0, 0);
  };

  render() {
    const { navigate } = this.props;
    return (
      <div className="product-view-container" key={this.state.oneProduct.slug}>
        <div className="product-view row">
          <div className="product-view-image col-lg-7 col-12 row">
            <div className="product-view-image-thumb col-md-2">
              <div
                className="product-view-image-thumb1"
                onClick={() =>
                  this.setState({
                    imageDetail: document.querySelector(
                      ".product-view-image-thumb1 img"
                    ).src,
                  })
                }
              >
                <img src={this.state.oneProduct.image01} alt="" className="" />
              </div>
              <div
                className="product-view-image-thumb2"
                onClick={() =>
                  this.setState({
                    imageDetail: document.querySelector(
                      ".product-view-image-thumb2 img"
                    ).src,
                  })
                }
              >
                <img src={this.state.oneProduct.image02} alt="" />
              </div>
            </div>
            <div className="product-view-image-detail col-md-10 col-12">
              <img
                src={
                  this.state.imageDetail === null
                    ? this.state.oneProduct.image01
                    : this.state.imageDetail
                }
                alt=""
              />
            </div>
            <div className="product-view-image-thumb-small row">
              <div
                className="product-view-image-thumb1 col-4"
                onClick={() =>
                  this.setState({
                    imageDetail: document.querySelector(
                      ".product-view-image-thumb1 img"
                    ).src,
                  })
                }
              >
                <img src={this.state.oneProduct.image01} alt="" />
              </div>
              <div
                className="product-view-image-thumb2 col-4"
                onClick={() =>
                  this.setState({
                    imageDetail: document.querySelector(
                      ".product-view-image-thumb2 img"
                    ).src,
                  })
                }
              >
                <img src={this.state.oneProduct.image02} alt="" />
              </div>
            </div>
          </div>
          <div className="product-view-detail col-lg-5 col-12">
            <div className="product-view-detail-name">
              <h2>{this.state.oneProduct.title}</h2>
            </div>
            <div className="product-view-detail-price">
              <span>
                {this.state.oneProduct.price.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  "."
                )}
                ₫
              </span>
            </div>
            <hr />
            <div className="product-view-detail-color">
              <h4>Màu sắc</h4>
              <div className="product-view-detail-color-list">
                {this.state.oneProduct.colors.map((item, index) => (
                  <div
                    key={index}
                    className={
                      item + ` ${this.state.color === item ? " active" : ""}`
                    }
                    onClick={() => this.setState({ color: item })}
                  ></div>
                ))}
              </div>
            </div>
            <div className="product-view-detail-size">
              <h4>Kích thước</h4>
              <div className="product-view-detail-size-list">
                {this.state.oneProduct.size.map((item, index) => (
                  <div
                    key={index}
                    className={this.state.size === item ? "active" : ""}
                    onClick={() => this.setState({ size: item })}
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="product-view-detail-amount">
              <h4>Số lượng</h4>
              <div className="product-view-detail-amount-btn">
                <button
                  className="amount-decrease"
                  onClick={() => this.handleDecreaseBtn()}
                >
                  -
                </button>
                <input
                  type="number"
                  className="amount-input"
                  value={this.state.amount}
                  onChange={() => this.handleChangeAmount()}
                  ref={this.inputAmount}
                />
                <button
                  className="amount-increase"
                  onClick={() => this.handleIncreaseBtn()}
                >
                  +
                </button>
              </div>
            </div>
            <div className="product-view-detail-button row">
              <div className="product-view-detail-button1">
                <Button
                  text={"Thêm vào giỏ hàng"}
                  icon="addtocart"
                  onClick={() => this.handleAddToCart()}
                />
              </div>
              <div className="product-view-detail-button2">
                <Button
                  text={"Mua ngay"}
                  icon="buynow"
                  onClick={() => {
                    var str = "Lỗi";
                    let result = this.checkAddToCart(str);
                    if (typeof result === typeof "sting") {
                      alert(result);
                    } else {
                      this.props.addToCartRedux(result);
                      navigate("/cart");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="product-view-description">
          <h2>CHI TIẾT SẢN PHẨM</h2>
          <div className="product-view-description-text" ref={this.description}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perferendis saepe ullam obcaecati ratione quidem eaque distinctio,
              provident a nemo ut possimus assumenda. Nulla porro exercitationem
              maiores quod? Laboriosam, voluptatibus quas. Earum fugit incidunt
              nisi, similique quia nulla molestias itaque, tenetur quibusdam
              doloribus accusamus possimus labore quasi tempora et assumenda,
              minus dignissimos. Fugit magni libero doloribus sed in molestiae
              exercitationem expedita quas id magnam quae unde illum omnis modi
              facere temporibus sint enim sunt, dolorum velit sit, pariatur ea
              illo. Facilis voluptas voluptates rerum qui ipsa ut similique
              veritatis, facere esse iure! Quisquam dolore soluta temporibus
              delectus aspernatur ducimus? Ut, quo? Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Perferendis saepe ullam obcaecati
              ratione quidem eaque distinctio, provident a nemo ut possimus
              assumenda. Nulla porro exercitationem maiores quod? Laboriosam,
              voluptatibus quas. Earum fugit incidunt nisi, similique quia nulla
              molestias itaque, tenetur quibusdam doloribus accusamus possimus
              labore quasi tempora et assumenda, minus dignissimos. Fugit magni
              libero doloribus sed in molestiae exercitationem expedita quas id
              magnam quae unde illum omnis modi facere temporibus sint enim
              sunt, dolorum velit sit, pariatur ea illo. Facilis voluptas
              voluptates rerum qui ipsa ut similique veritatis, facere esse
              iure! Quisquam dolore soluta temporibus delectus aspernatur
              ducimus? Ut, quo?Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Perferendis saepe ullam obcaecati ratione quidem
              eaque distinctio, provident a nemo ut possimus assumenda. Nulla
              porro exercitationem maiores quod? Laboriosam, voluptatibus quas.
              Earum fugit incidunt nisi, similique quia nulla molestias itaque,
              tenetur quibusdam doloribus accusamus possimus labore quasi
              tempora et assumenda, minus dignissimos. Fugit magni libero
              doloribus sed in molestiae exercitationem expedita quas id magnam
              quae unde illum omnis modi facere temporibus sint enim sunt,
              dolorum velit sit, pariatur ea illo. Facilis voluptas voluptates
              rerum qui ipsa ut similique veritatis, facere esse iure! Quisquam
              dolore soluta temporibus delectus aspernatur ducimus? Ut, quo?
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae illo enim esse soluta, ad expedita laboriosam quisquam
              necessitatibus vero autem rem voluptate, architecto tenetur sequi
              impedit eum numquam omnis corporis totam repellat temporibus
              aperiam inventore optio quidem. Voluptatum ullam unde laudantium
              harum aut reiciendis voluptate qui, reprehenderit velit deleniti
              neque?{" "}
            </p>
            <div className="linear-gradient"></div>
          </div>
          <div
            className="product-view-description-btn-readmore"
            ref={this.readMoreBtn}
          >
            <Button
              text="Đọc thêm"
              icon="readmore"
              onClick={() => this.handleReadMore()}
            />
          </div>
          <div
            className="product-view-description-btn-collapse hide"
            ref={this.collapseBtn}
          >
            <Button
              text="Thu gọn"
              icon="collapse"
              onClick={() => this.handleReadMore()}
            />
          </div>
        </div>
        <hr />
        <div className="product-view-more">
          <h3>CÓ THỂ BẠN MUỐN MUA</h3>
          <div className="product-view-more-items row">
            {this.state.randomProduct.map((item, index) => (
              <ProductCard
                key={index}
                img={item.image01}
                name={item.title}
                price={item.price}
                path={item.slug}
                grid=" col-xl-3 col-md-6 col-12"
                handleChangePath={() => this.handleChangePath(item.slug)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataRedux: state.listProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCartRedux: (product) =>
      dispatch({ type: "ADD_TO_CART", payload: product }),
  };
};

function WithNavigate(props) {
  let navigate = useNavigate();
  return <ProductView {...props} navigate={navigate} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate);
