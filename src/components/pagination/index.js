import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { v4 as uuidv4 } from 'uuid';
import { usePagination, DOTS } from "../../store/use-pagination";
import './style.css';

function Pagination(props) {
  const {onPageChange, totalCount, siblingCount = 1, currentPage, pageSize = 10} = props;
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

export default memo(Pagination);