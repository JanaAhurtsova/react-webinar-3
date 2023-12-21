import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsLayout(props) {
  const cn = bem("Comments");

  return (
    <div className={cn()}>
      <h3 className={cn("title")}>{props.t("comment.comments")} ({props.count})</h3>
      {props.children}
    </div>
  );
}

CommentsLayout.propsType = {
  children: PropTypes.node,
  count: PropTypes.number,
  t: PropTypes.func
}

CommentsLayout.defaultProps = {
  t: (text) => {}
}

export default memo(CommentsLayout);
