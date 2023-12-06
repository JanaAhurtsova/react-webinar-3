import { cn as bem } from "@bem-react/classname";
import { memo } from "react";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import langJSON from '../../assets/lang.json'
import './style.css';

function Card(props) {
  const cn = bem("Card");

  const callbacks = {
    onAdd: (e) => props.onAdd(props._id),
  };

  const currancy = numberFormat(props.price, 'RU', {
    style: "currency",
    currency: "RUB",
  });

  return (
    <div className={cn()}>
      <p className={cn("description")}>{props.description}</p>
      <p className={cn("madeIn")}>
        {langJSON[props.lang].country}
        <b> {props.madeIn} ({props.code})</b>
      </p>
      <p className={cn("category")}>
        {langJSON[props.lang].category}
        <b> {props.category}</b>
      </p>
      <p className={cn("edition")}>
        {langJSON[props.lang].year}
        <b> {props.edition}</b>
      </p>
      <h3>{langJSON[props.lang].price} {currancy}</h3>
      <button onClick={callbacks.onAdd}>{langJSON[props.lang].add}</button>
    </div>
  );
}

Card.propTypes = {
  _id: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  madeIn: PropTypes.string,
  category: PropTypes.string,
  edition: PropTypes.number,
};

export default memo(Card)