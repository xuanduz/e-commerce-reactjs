import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";

import Sale from "./Sale";
import Button from "./Button";

class ProductCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props;
    return (
      <div className={"card-container " + this.props.grid}>
        {this.props.type === "sale-product" ? <Sale /> : null}
        <div className="card">
          <div className="card-image">
            <img src={this.props.img} />
          </div>
          <div className="card-details">
            <div className="card-details-center">
              <h1>{this.props.name}</h1>
              <div className="card-details-center-price">
                {this.props.type === "sale-product" ? (
                  <del>
                    {(parseInt(this.props.price) * 1.5)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    ₫
                  </del>
                ) : null}
                <span>
                  {this.props.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫
                </span>
              </div>
              <div className="card-details-center-button">
                <Link to={`/products/${this.props.path}`}>
                  <Button
                    text="Xem thêm"
                    onClick={() => this.props.handleChangePath()}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function (props) {
  const navigate = useNavigate();
  return <ProductCard {...props} navigate={navigate} />;
}
