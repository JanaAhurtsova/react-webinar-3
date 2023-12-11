import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { paginationRange, DOTS } from "../../utils";
import './style.css';

function Pagination(props) {
  const {onPageChange, totalCount, siblingCount, currentPage, pageSize} = props;
  const cn = bem("Pagination");

  const customPagination = paginationRange({currentPage, totalCount, siblingCount, pageSize});

  if (currentPage === 0 || customPagination.length < 2) {
    return null;
  }

  return (
    <ul className={cn()}>
      {customPagination.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <li className={`${cn("item")} dots`} key={idx}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={`${cn("item")} ${
              pageNumber === currentPage ? "selected" : ""
            }`}
            key={idx}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func,
  totalCount: PropTypes.number,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
};

Pagination.defaultProps = {
  siblingCount: 1,
  pageSize: 10
};

export default memo(Pagination);