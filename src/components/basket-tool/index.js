import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import Navigation from "../navigation";

function BasketTool({ sum, amount, onOpen, translate }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <Navigation link={translate("main")} />
      <div className={cn("wrapper")}>
        <span className={cn("label")}>{translate("cartLabel")}</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, translate("locale"), translate("variants"))} / ${numberFormat(sum)} ₽`
            : translate("empty")}
        </span>
        <button onClick={onOpen}>{translate("move")}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  translate: PropTypes.func
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
