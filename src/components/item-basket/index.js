import {memo} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {numberFormat} from "../../utils";
import langJSON from '../../assets/lang.json';
import './style.css';

function ItemBasket(props) {

  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`/product/${props.item._id}`} onClick={props.onClose} className={cn('title')}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {langJSON[props.lang].pieces}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{langJSON[props.lang].delete}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func,
  lang: PropTypes.string
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);