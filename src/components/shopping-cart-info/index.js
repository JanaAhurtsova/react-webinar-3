import React from "react";
import PropTypes from "prop-types";

import { pluralCurrency, pluralGoods } from "../../utils";
import Controls from "../controls";
import "./style.css";

function ShoppingCartInfo({ count, sum, onMoveToCart }) {
  return (
    <div className="Shopping-cart-info">
      <div className="Shopping-cart-info-total">
        В корзине:
        <b>
          {count
            ? ` ${count} ${pluralGoods(count, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${pluralCurrency(sum)}`
            : "пусто"}
        </b>
      </div>
      <Controls onAction={onMoveToCart} title="Перейти" />
    </div>
  );
}

ShoppingCartInfo.propTypes = {
  count: PropTypes.number,
  sum: PropTypes.number,
  onMoveToCart: PropTypes.func
};

export default React.memo(ShoppingCartInfo);
