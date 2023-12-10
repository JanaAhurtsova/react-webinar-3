import { cn as bem } from "@bem-react/classname";
import { memo } from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import './style.css';

function Card(props) {
  const cn = bem("Card");

  const callbacks = {
    onAdd: () => props.onAdd(props.product._id),
  };

  const currancy = numberFormat(props.product.price, 'RU', {
    style: "currency",
    currency: "RUB",
  });

  return (
    <div className={cn()}>
      <p className={cn("description")}>{props.product.description}</p>
      <p className={cn("madeIn")}>
        {props.translate("country")}
        <b> {props.product.madeIn?.title} ({props.product.madeIn?.code})</b>
      </p>
      <p className={cn("category")}>
        {props.translate("category")}
        <b> {props.product.category?.title}</b>
      </p>
      <p className={cn("edition")}>
        {props.translate("year")}
        <b> {props.product.edition}</b>
      </p>
      <h3 className={cn("price")}>{props.translate("price")} {currancy}</h3>
      <button onClick={callbacks.onAdd}>{props.translate("add")}</button>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string
    }),
    edition: PropTypes.number,
  }),
  translate: PropTypes.func
};

export default memo(Card)