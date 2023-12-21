import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css"

function Comment(props) {
  const cn = bem("Comment");

  const date = new Date(props.dateCreate);

  const dateFromDate = {
    date: date.getDate(),
    month: date.toLocaleString("default", { month: "long" }),
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };

  const callbacks={
    onReply: () => {
      props.onReply(props._id);
    }
  }

  return (
    <article className={cn()}>
      <div className={cn("header")}>
        <h3 className={cn("username")}>{props.author.profile.name}</h3>
        <span className={cn("date")}>{`${dateFromDate.date} ${
          dateFromDate.month
        } ${dateFromDate.year} в ${dateFromDate.hours}:${
          dateFromDate.minutes > 10
            ? dateFromDate.minutes
            : "0" + dateFromDate.minutes
        }`}</span>
      </div>
      <p className={cn("text")}>{props.text}</p>
      <div className={cn("reply")}>
        <button onClick={callbacks.onReply} className={cn("action")}>
          Ответить
        </button>
      </div>
    </article>
  );
}

Comment.protoTypes = {
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dateCreate: PropTypes.string,
  text: PropTypes.string,
  author: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    profile: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  offset: PropTypes.number,
  onReply: PropTypes.func,
};

export default Comment;