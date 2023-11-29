import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import Overlay from "../overlay";
import Head from "../head";
import { pluralCurrency } from "../../utils";
import Controls from "../controls";
import ListCart from "../lists/list-cart";
import './style.css';

function ShoppingCart(props) {
  const cn = bem("ShoppingCart");

  return (
    <Overlay setIsOpen={props.setIsOpen}>
      <div className={cn()}>
        <div className={cn("header")}>
          <Head title="Корзина" />
          <Controls onAction={props.onCloseModal} title="Закрыть" />
        </div>
        <ListCart list={props.list} onRemoveItemFromCart={props.onDeleteItem} />
        {props.list.length > 0 ? (
          <div className={cn("total")}>
            <b>Итого</b>
            <b>{pluralCurrency(props.sum)}</b>
          </div>
        ) : (
          ""
        )}
      </div>
    </Overlay>
  );
}

ShoppingCart.propTypes = {
  setIsOpen: PropTypes.func,
  onCloseModal: PropTypes.func,
  onDeleteItem: PropTypes.func,
  sum: PropTypes.number,
};

ShoppingCart.defaultProps = {
  setIsOpen: () => {},
  onCloseModal: () => {},
  onDeleteItem: () => {},
};

export default React.memo(ShoppingCart);
