import {memo} from "react";
import PropTypes from 'prop-types';
import langJSON from '../../assets/lang.json'
import './style.css';

function Controls({onAdd, lang}) {
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{langJSON[lang].add}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  lang: PropTypes.string
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
