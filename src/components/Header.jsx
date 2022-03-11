import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../assets/images/Logo-2.png'

class Header extends Component {
  constructor() {
    super();
    this.headerRef = React.createRef();
    this.state = {
      mainNav: [
        {
          display: "Trang chủ",
          path: '/'
        },
        {
          display: "Sản phẩm",
          path: '/products'
        },
        {
          display: "Liên hệ",
          path: '/contact'
        },
      ]
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
        this.headerRef.current.classList.add('shrink')
      } else {
        this.headerRef.current.classList.remove('shrink')
      }
    })
  }

  handleBtnMenu() {
    document.querySelector('#nav-icon3').classList.toggle('open')

    document.querySelector('.header-container-sidebar').classList.toggle('show-sidebar')
  }

  render() {
    const totalAmount = this.props.dataRedux.reduce((total, item) => total + item.amount, 0)
    return (
      <div className='header-container' ref={this.headerRef}>
        <div className="header">
          <div className="header-logo">
            <Link to='/' >
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="header-nav-items">
            <ul>
              {this.state.mainNav.map((item, index) => (
                <Link to={item.path} key={index} >
                  <li>{item.display}</li>
                </Link>
              ))}
            </ul>
            <div className="header-nav-items-bag">
              <Link to='/cart'>
                <i className="fas fa-shopping-bag"></i>
                <div className={totalAmount > 0 ? 'total-amount total-amount-small' : 'hide'}>{totalAmount}</div>
              </Link>
            </div>
          </div>
          <div className="header-menu ">
            <div
              id="nav-icon3"
              onClick={() => this.handleBtnMenu()}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="header-container-sidebar">
          <Link to='/' >
            <img src={logo} alt="" />
          </Link>
          <ul>
            {this.state.mainNav.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                onClick={() => this.handleBtnMenu()}
              >
                <li>{item.display}</li>
              </Link>
            ))}
            <Link
              to='/cart'
              onClick={() => this.handleBtnMenu()}
            >
              <i className="fas fa-shopping-bag"></i>
              <div className={totalAmount > 0 ? 'total-amount total-amount-small' : 'hide'}>{totalAmount}</div>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataRedux: state.listProduct
  }
}

export default connect(mapStateToProps)(Header);


