import React, { Component } from 'react';
import _ from 'lodash';

import Button from './Button';
import category from '../assets/fake-data/category'
import colors from '../assets/fake-data/product-color'
import size from '../assets/fake-data/product-size'

import Checkbox from './Checkbox';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      categoryChecked: [],
      colorChecked: [],
      sizeChecked: [],
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.data
    })
  }

  handleCheckbox = (type, check, item) => {
    if (check.checked === true) {
      switch (type) {
        case 'category':
          this.setState({
            categoryChecked: [
              ...this.state.categoryChecked,
              item.categorySlug
            ]
          })
          break
        case 'color':
          this.setState({
            colorChecked: [
              ...this.state.colorChecked,
              item.color
            ]
          })
          break
        case 'size':
          this.setState({
            sizeChecked: [
              ...this.state.sizeChecked,
              item.size
            ]
          })
          break
        default:
      }
    } else
      if (check.checked === false) {
        switch (type) {
          case 'category':
            const newCategoryChecked = (this.state.categoryChecked).filter(i => i !== item.categorySlug)
            this.setState({
              categoryChecked: newCategoryChecked
            })
            break
          case 'color':
            const newColorChecked = (this.state.colorChecked).filter(i => i !== item.color)
            this.setState({
              colorChecked: newColorChecked
            })
            break
          case 'size':
            const newSizeChecked = (this.state.sizeChecked).filter(i => i !== item.size)
            this.setState({
              sizeChecked: newSizeChecked
            })
            break
          default:
        }
      }
  }

  handleFilter = () => {
    if (this.props.filterBarClicked) {
      this.props.filterBarClicked()
    }
    const dataTemp = this.state.data
    if (this.state.categoryChecked.length === 0 &&
      this.state.colorChecked.length === 0 &&
      this.state.sizeChecked.length === 0
    ) {
      this.props.handleFilter(dataTemp)
    }
    else {
      var result = []
      if (this.state.categoryChecked.length > 0) {
        this.state.categoryChecked.map((itemCat, index) => {
          result = result.concat(this.state.data.filter(i => i.categorySlug === itemCat))
        })
      }
      if (this.state.colorChecked.length > 0) {
        this.state.colorChecked.map((itemCol, index) => {
          if (this.state.categoryChecked.length === 0) {
            result = result.concat(this.state.data.filter(i => i.colors.includes(itemCol)))
          }
          else {
            result = result.filter(i => i.colors.includes(itemCol) === true)
          }
        })
      }
      if (this.state.sizeChecked.length > 0) {
        this.state.sizeChecked.map((itemSiz, index) => {
          if (this.state.categoryChecked.length === 0) {
            result = result.concat(this.state.data.filter(i => i.size.includes(itemSiz)))
          }
          else {
            result = result.filter(i => i.size.includes(itemSiz) === true)
          }
        })
      }
      result = _.uniqWith(result, _.isEqual);
      this.props.handleFilter(result)
    }
  }
  clearFilter = () => {
    this.setState({
      categoryChecked: [],
      colorChecked: [],
      sizeChecked: []
    })
    this.props.handleFilter(this.state.data)
  }
  render() {
    return (
      <div className='filter'>
        <div className="filter-category">
          <h3>Danh Mục Sản Phẩm</h3>
          {category.map((item, index) => (
            <Checkbox
              key={index}
              display={item.display}
              item={item}
              checked={this.state.categoryChecked.includes(item.categorySlug)}
              onChange={(check, item) => this.handleCheckbox('category', check, item)}
            />
          ))}
        </div>
        <div className="filter-color">
          <h3>Màu Sắc</h3>
          {colors.map((item, index) => (
            <Checkbox
              key={index}
              display={item.display}
              item={item}
              checked={this.state.colorChecked.includes(item.color)}
              onChange={(check, item) => this.handleCheckbox('color', check, item)}
            />
          ))}
        </div>
        <div className="filter-size">
          <h3>Kích Cỡ</h3>
          {size.map((item, index) => (
            <Checkbox
              key={index}
              display={item.display}
              item={item}
              checked={this.state.sizeChecked.includes(item.size)}
              onChange={(check, item) => this.handleCheckbox('size', check, item)}
            />
          ))}
        </div>
        <div className="filter-submit">
          <Button text='Lọc' onClick={() => this.handleFilter()} />
          <Button text='Xóa bộ lọc' onClick={() => this.clearFilter()} />
        </div>
      </div>
    );
  }
}

export default Filter;
