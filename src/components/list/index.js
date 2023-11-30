import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onAction, buttonTitle}) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item item={item} onAction={onAction} buttonTitle={buttonTitle} />
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
  onAction: PropTypes.func,
  buttonTitle: PropTypes.string
};

List.defaultProps = {
  onAction: () => {},
};

export default React.memo(List);
