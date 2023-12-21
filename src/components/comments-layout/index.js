import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsLayout(props) {
  const cn = bem("Comments");

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>Комментарии ({props.count})</h3>
      {props.children}
    </div>
  );
}

CommentsLayout.propsType = {
  children: PropTypes.node,
  count: PropTypes.number
}

export default memo(CommentsLayout);
