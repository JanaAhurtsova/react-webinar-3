import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css"
import { getLastChild } from "../../utils/last-child";
import { useEffect, useState } from "react";

function Comment(props) {
  const cn = bem("Comment");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const maxOffset =
      props.comment.offset > props.maxNesting
        ? props.maxNesting
        : props.comment.offset;
    setOffset(maxOffset);
  }, [setOffset]);

  const date = new Date(props.comment.dateCreate);

  const dateFromDate = {
    date: date.getDate(),
    month: date.toLocaleString(props.t("comment.locale"), { month: "long" }),
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };

  const callbacks={
    onReply: () => {
      const lastChild = getLastChild(props.comment);
      props.onReply(lastChild);
      props.setOffsetForm(offset);
    }
  }

  return (
    <article className={cn()} style={{ paddingLeft: `${offset * 30}px` }}>
      <div className={cn("header")}>
        <h3
          className={cn("username", {
            current:
              props.comment.author.profile.name === props.currentUsername,
          })}
        >
          {props.comment.author.profile.name}
        </h3>
        <span className={cn("date")}>{`${dateFromDate.date} ${
          dateFromDate.month
        } ${dateFromDate.year} ${props.t("comment.at")} ${dateFromDate.hours}:${
          dateFromDate.minutes > 10
            ? dateFromDate.minutes
            : "0" + dateFromDate.minutes
        }`}</span>
      </div>
      <p className={cn("text")}>{props.comment.text}</p>
      <div className={cn("reply")}>
        <button onClick={callbacks.onReply} className={cn("action")}>
          {props.t("comment.reply")}
        </button>
      </div>
    </article>
  );
}

Comment.protoTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dateCreate: PropTypes.string,
    text: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    children: PropTypes.array
  }),
  offset: PropTypes.number,
  onReply: PropTypes.func,
  t: PropTypes.func,
  currentUsername: PropTypes.string
};

export default Comment;