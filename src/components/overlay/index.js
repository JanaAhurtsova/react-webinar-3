import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Overlay({ setIsOpen, children }) {
  return (
    <>
      <div className="Overlay" onClick={() => setIsOpen(false)}></div>
      <div className='Centered'>{children}</div>
    </>
  );
}

Overlay.propTypes = {
  setIsOpen: PropTypes.func,
  children: PropTypes.node
};

export default React.memo(Overlay);
