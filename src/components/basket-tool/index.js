import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { NavLink } from "react-router-dom";
import { numberFormat, plural } from "../../utils";
import langJSON from '../../assets/lang.json';
import "./style.css";

function BasketTool({ sum, amount, onOpen, lang }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <NavLink to="/" className={cn('link')}>{langJSON[lang].main}</NavLink>
      <div className={cn("wrapper")}>
        <span className={cn("label")}>{langJSON[lang].cartLabel}</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, langJSON[lang].locale, langJSON[lang].variants)} / ${numberFormat(sum)} ₽`
            : langJSON[lang].empty}
        </span>
        <button onClick={onOpen}>{langJSON[lang].move}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
