import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import Controls from "../controls";
import {pluralCurrency} from "../../utils";
import './style.css';

function Item(props) {
  const cn = bem("Item");

  return (
    <div className={cn()}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{pluralCurrency(props.item.price)}</div>
      {props.item.count && (
        <span className={cn("count")}>{props.item.count} шт</span>
      )}
      <Controls
        onAction={() => props.onAction(props.item.code)}
        title={props.buttonTitle}
      />
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  buttonTitle: PropTypes.string
};

Item.defaultProps = {
  onAction: () => {},
};

export default React.memo(Item);
