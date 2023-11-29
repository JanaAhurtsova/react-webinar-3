import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import {pluralCurrency} from "../../../utils";
import './style.css';

function ItemLayout(props) {
  const cn = bem("Item");

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{pluralCurrency(props.item.price)}</div>
      {props.children}
    </div>
  );
}

ItemLayout.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  children: PropTypes.node
};

export default React.memo(ItemLayout);
