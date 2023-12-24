import { useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentForm(props) {
  const cn = bem("CommentForm");

  const [text, setText] = useState("");

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();

      if(!text.trim()) {
        return;
      }

      props.onSubmit(text, props.commentId);
      setText("");
      props.onCancel();
    },

    onChange: (e) => setText(e.target.value),

    onCancel: (e) => {
      e.preventDefault(),
      props.onCancel();
    }
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h3 className={cn("title")}>
        {props.isReply
          ? props.t("comment.new.reply")
          : props.t("comment.new.comment")}
      </h3>
      <textarea
        onChange={callbacks.onChange}
        value={text}
        name="text"
        className={cn("textarea")}
        rows={4}
      ></textarea>
      <div className={cn("buttons")}>
        <button className={cn("submit")} type="submit">
          {props.t("comment.send")}
        </button>
        {props.isReply && (
          <button onClick={callbacks.onCancel} className={cn("cancel")}>
            {props.t("comment.cancel")}
          </button>
        )}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  commentId: PropTypes.string,
  t: PropTypes.func,
  isReply: PropTypes.bool,
};

CommentForm.defaultProps = {
  isReply: false,
  onCancel: () => {},
  t: (text) => {}
};

export default CommentForm;