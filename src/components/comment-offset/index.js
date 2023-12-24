import { forwardRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";

const CommentOffset = forwardRef((props, ref) => {
  useLayoutEffect(() => {
    if (!ref) {
      return;
    }

    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }, [ref]);

  const padding =
    props.offset > props.maxNesting
      ? `${props.offset * 30}px`
      : `${(props.offset + 1) * 30}px`;

  return (
    <div ref={ref} style={{paddingLeft: padding}}>
      {props.children}
    </div>
  );
})

CommentOffset.propTypes = {
  scrollTo: PropTypes.bool,
  offset: PropTypes.number,
  maxNesting: PropTypes.number,
  children: PropTypes.node,
};
export default CommentOffset;