import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from "prop-types";
import { usePagination, DOTS } from "../../store/use-pagination";
import './style.css';

function Pagination(props) {
  const {onPageChange, totalCount, siblingCount, currentPage, pageSize} = props;
  const cn = bem("Pagination");

  const paginationRange = usePagination({currentPage, totalCount, siblingCount, pageSize});

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className={cn()}>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className={`${cn("item")} dots`} key={uuidv4()}>&#8230;</li>;
        }

        return (
          <li
            className={`${cn("item")} ${
              pageNumber === currentPage ? "selected" : ""
            }`}
            key={pageNumber}
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