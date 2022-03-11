import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../components/Button'

class Cart extends Component {
  constructor() {
    super();
    this.amountRef = React.createRef([]);
    this.setWrapperRef = React.createRef();
    this.state = {
      clickOutside: false,
      amountInput: 1,
      item: {
        index: null,
        value: null
      },
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    localStorage.setItem('CART-ITEMS', JSON.stringify(this.props.dataRedux))
  }

  componentDidUpdate() {
    console.log('did update')
    localStorage.setItem('CART-ITEMS', JSON.stringify(this.props.dataRedux))
  }

  handleChangeAmount = (e) => {
    var item = {
      index: parseInt((e.target.id).slice(-1)),
      value: null,
    }

    if (e.target.value === '') {
      item = {
        index: parseInt((e.target.id).slice(-1)),
        value: ''
      }
    }
    else if (!isNaN(e.target.value)) {
      item = {
        index: parseInt((e.target.id).slice(-1)),
        value: parseInt(e.target.value),
      };
    }
    this.props.handleOnChange(item);
  }

  handleKeyPress = (e) => {
    if (e.charCode === 43 || e.charCode === 45) {
      e.preventDefault()
    }
  }

  render() {
    let listProductBought = this.props.dataRedux;
    let totalPrice = this.props.dataRedux.reduce((total, item) =>
      total + item.amount * item.price
      , 0)
    return <div className='cart-container'  >
      <div className="cart row">
        <div className="cart-main col-12">
          <div className="cart-main-header row">
            <div className='col-6 '>Sản phẩm</div>
            <div className='col-2'>Đơn giá</div>
            <div className='col-2'>Số lượng</div>
            <div className='col-2'>Số tiền</div>
          </div>
          {listProductBought && listProductBought.length > 0 &&
            listProductBought.map((item, index) => {
              return (
                <div className="cart-main-content row" key={index}>
                  <div className="cart-main-content-col1 row col-6 ">
                    <div className="cart-main-content-col1-img col-3">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="cart-main-content-col1-text col-8">
                      <div>
                        <Link to={`/products/${item.slug}`}>
                          <div className="title">
                            <span>{item.name}</span>
                          </div>

                        </Link>
                        <div className="type">
                          <span>{item.color} / {item.size}</span>
                        </div>
                      </div>
                      <div className="delete" onClick={() => this.props.handleDelete(item)}>
                        <i className="bx bx-trash"></i>
                        <span>Xóa</span>
                      </div>
                    </div>
                  </div>
                  <div className='cart-price-per-item col-2'>
                    <div>{item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫</div>
                  </div>
                  <div className='cart-amount col-2'>
                    <div className="product-view-detail-amount-btn">
                      <button className='amount-decrease' onClick={() => this.props.handleDecreaseBtn(item)}>-</button>
                      <input
                        type="number"
                        id={`amountInput` + index.toString()}
                        className="amount-input"
                        value={item.amount}
                        onChange={(e) => this.handleChangeAmount(e)}
                        ref={this.amountRef[index]}
                        onKeyPress={this.handleKeyPress}
                      />
                      <button className='amount-increase' onClick={() => this.props.handleIncreaseBtn(item)}>+</button>
                    </div>
                  </div>
                  <div className='cart-total-price col-2'>
                    <div>
                      {item.amount === '' ?
                        (item.price * 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") :
                        (item.price * parseInt(item.amount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      }₫
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="cart-footer-container row">
          <div className="cart-footer row">
            <div className="cart-footer-left col-lg-6 col-12">
              <div className="cart-footer-left-icon">
                <i className="bx bxs-truck"></i>
              </div>
              <div className={`car-footer-left-freeship` + (totalPrice >= 200000 ? `` : ` hide`)}>
                <h4>Miễn phí giao hàng</h4>
              </div>
              <div className={`car-footer-left-charges` + (totalPrice < 200000 ? `` : ` hide`)}>
                <h4>Phí giao hàng <span>30.000₫</span></h4>
                <p>Mua trên <span>200.000₫</span> sẽ được <span>Freeship</span></p>
              </div>
            </div>
            <div className="cart-footer-right col-lg-6 col-12">
              <div className="cart-footer-right-total-price">
                <b>Tổng cộng</b>
                <span>{(totalPrice < 200000 ? totalPrice + 30000 : totalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫</span>
              </div>
              <div className="cart-footer-right-btn">
                <div className="cart-footer-right-total-amount"></div>
                <Button text={'Thanh toán'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    dataRedux: state.listProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDecreaseBtn: (item) => dispatch({ type: 'DECREASE', payload: item }),
    handleIncreaseBtn: (item) => dispatch({ type: 'INCREASE', payload: item }),
    handleOnChange: (obj) => dispatch({ type: 'ON_CHANGE', payload: obj }),
    handleDelete: (item) => dispatch({ type: 'ON_DELETE', payload: item }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
