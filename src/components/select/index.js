import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  const render = {
    options: (options) => {
      const items = [];
      let depth = 0;

      const addDashes = (elems) => {
        elems.forEach((option) => {
          const dashes = depth > 0 ? "- ".repeat(depth) : "";
          items.push(
            <option key={option.value} value={option.value}>
              {dashes} {option.title}
            </option>
          );

          if (option.children) {
            depth++;
            addDashes(option.children);
            depth--;
          }
        });
      }

      addDashes(options);

      return items;
    }
  }

  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {render.options(props.options)}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

Select.defaultProps = {
  onChange: () => {
  }
}

export default memo(Select);
