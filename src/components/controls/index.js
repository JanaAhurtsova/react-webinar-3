import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls(props) {
  return (
    <div className='Controls'>
      <button onClick={props.onAction}>{props.title}</button>
    </div>
  )
}

Controls.propTypes = {
  onAction: PropTypes.func,
  title: PropTypes.string
};

Controls.defaultProps = {
  onAction: () => {}
}

export default React.memo(Controls);
