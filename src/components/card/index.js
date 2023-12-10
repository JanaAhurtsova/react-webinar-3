import { cn as bem } from "@bem-react/classname";
import { memo } from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import langJSON from '../../assets/lang.json'
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
        {langJSON[props.lang].country}
        <b> {props.product.madeIn?.title} ({props.product.madeIn?.code})</b>
      </p>
      <p className={cn("category")}>
        {langJSON[props.lang].category}
        <b> {props.product.category?.title}</b>
      </p>
      <p className={cn("edition")}>
        {langJSON[props.lang].year}
        <b> {props.product.edition}</b>
      </p>
      <h3 className={cn("price")}>{langJSON[props.lang].price} {currancy}</h3>
      <button onClick={callbacks.onAdd}>{langJSON[props.lang].add}</button>
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
  })
};

export default memo(Card)