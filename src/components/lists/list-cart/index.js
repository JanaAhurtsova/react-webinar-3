import React from "react";
import PropTypes from "prop-types";
import ItemCart from "../../items/item-cart";
import './style.css';

function ListCart({ list, onRemoveItemFromCart }) {
  return (
    <div className="List-cart">
      {list.length > 0 ? list.map((item) => (
        <div key={item.code} className="List-item">
          <ItemCart item={item} onRemoveItem={onRemoveItemFromCart} />
        </div>
      )) : 'В корзине пусто'}
    </div>
  );
}

ListCart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onRemoveItemFromCart: PropTypes.func,
};

ListCart.defaultProps = {
  onRemoveItemFromCart: () => {},
};

export default React.memo(ListCart);
