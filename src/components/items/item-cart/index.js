import React from "react";
import PropTypes from "prop-types";

import ItemLayout from "../../layouts/item-layout";
import Controls from "../../controls";
import './style.css';

function ItemCart(props) {
  return (
    <ItemLayout {...props}>
      <span className="Item-count">
        {props.item.count} шт
      </span>
      <Controls
        onAction={() => props.onRemoveItem(props.item.code)}
        title="Удалить"
      />
    </ItemLayout>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onRemoveItem: PropTypes.func,
};

ItemCart.defaultProps = {
  onRemoveItem: () => {},
};

export default React.memo(ItemCart);