const items =
  localStorage.getItem("CART-ITEMS") !== null
    ? JSON.parse(localStorage.getItem("CART-ITEMS"))
    : [];

const initState = {
  listProduct: [...items],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let existItem = state.listProduct.findIndex(
        (item) =>
          item.slug === action.payload.slug &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      // item haven't in array
      if (existItem === -1) {
        return {
          ...state,
          listProduct: [...state.listProduct, action.payload],
        };
      }
      // item exist in array
      else {
        return {
          ...state,
          listProduct: [
            ...state.listProduct.map((item, index) => {
              var itemAdded = { ...item };
              if (index === existItem) {
                itemAdded.amount = itemAdded.amount + action.payload.amount;
                return itemAdded;
              } else {
                return item;
              }
            }),
          ],
        };
      }

    case "DECREASE":
      let existDecrease = state.listProduct.findIndex(
        (item) =>
          item.slug === action.payload.slug &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      return {
        ...state,
        listProduct: [
          ...state.listProduct.map((item, index) => {
            var decreaseAmount = { ...item };
            if (index === existDecrease && item.amount >= 1) {
              decreaseAmount.amount =
                state.listProduct[existDecrease].amount - 1;
              return decreaseAmount;
            } else {
              return item;
            }
          }),
        ],
      };

    case "INCREASE":
      let existIncrease = state.listProduct.findIndex(
        (item) =>
          item.slug === action.payload.slug &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      return {
        ...state,
        listProduct: [
          ...state.listProduct.map((item, index) => {
            var increaseAmount = { ...item };
            if (index === existIncrease) {
              increaseAmount.amount =
                state.listProduct[existIncrease].amount + 1;
              return increaseAmount;
            } else {
              return item;
            }
          }),
        ],
      };

    case "ON_CHANGE":
      let itemChanged = action.payload;
      return {
        ...state,
        listProduct: [
          ...state.listProduct.map((item, index) => {
            var changeAmount = { ...item };
            if (index === itemChanged.index) {
              changeAmount.amount = itemChanged.value;
              return changeAmount;
            } else {
              return item;
            }
          }),
        ],
      };

    case "ON_DELETE":
      let existDelete = state.listProduct.findIndex(
        (item) =>
          item.slug === action.payload.slug &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      return {
        ...state,
        listProduct: state.listProduct.filter((x, index) => {
          if (index === existDelete) {
            return false;
          } else {
            return true;
          }
        }),
      };

    default:
      return state;
  }
};

export default rootReducer;
