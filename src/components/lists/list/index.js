import React from "react";
import PropTypes from 'prop-types';
import ItemList from '../../items/item-list';
import './style.css';

function List({list, onAddItemToCart}) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <ItemList item={item} onAddItem={onAddItemToCart} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onAddItemToCart: PropTypes.func,
};

List.defaultProps = {
  onAddItemToCart: () => {},
};

export default React.memo(List);
