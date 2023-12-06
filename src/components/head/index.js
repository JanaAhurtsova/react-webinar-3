import {memo} from "react";
import PropTypes from "prop-types";
import Switcher from "../switcher";
import './style.css';

function Head({title}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <Switcher />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
