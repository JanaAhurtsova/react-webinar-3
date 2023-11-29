import React from "react";
import PropTypes from "prop-types";

import ItemLayout from "../../layouts/item-layout";
import Controls from "../../controls";

function ItemList(props) {
  return (
    <ItemLayout {...props}>
      <Controls onAction={() => props.onAddItem(props.item.code)} title='Добавить'/>
    </ItemLayout>
  );
}

ItemList.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddItem: PropTypes.func
};

ItemList.defaultProps = {
  onAddItem: () => {},
};

export default React.memo(ItemList);
