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
      <h3 className={cn("title")}>Новый комментарий</h3>
      <textarea
        onChange={callbacks.onChange}
        value={text}
        name="text"
        className={cn("textarea")}
        rows={4}
      ></textarea>
      <div className={cn("buttons")}>
        <button className={cn("submit")} type="submit">
          Отправить
        </button>
        {props.cancelBtn && (
          <button onClick={callbacks.onCancel} className={cn("cancel")}>
            Отменить
          </button>
        )}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  cancelBtn: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  commentId: PropTypes.string,
};

CommentForm.defaultProps = {
  cancelBtn: false,
  onCancel: () => {},
};

export default CommentForm;