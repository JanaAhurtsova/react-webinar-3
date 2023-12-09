import { useMemo } from "react";
import { range } from "../utils";

export const DOTS = "...";

export function usePagination ({
  totalCount,
  pageSize = 10,
  siblingCount = 1,
  currentPage,
}) {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 3;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // не показывать левые точки
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = Math.max(currentPage, 2) + siblingCount;
      const leftRange = range(firstPageIndex, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    //не показывать правые точки
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount =
        Math.max(totalPageCount - currentPage + 1, 2) + siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    //показывать точки с двух сторон
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
