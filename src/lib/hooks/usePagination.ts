import React from "react";

import { range } from "../utils";

type paginationProps = {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
};

function usePagination({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: paginationProps) {
  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    // Case 1: If the number of pages is less than page pills (page numbers that we want to show)
    if (totalPageCount <= totalPageNumbers) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Case 2: Only right dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "...", lastPageIndex];
    }

    // Case 3: Only left dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalCount);
      return [firstPageIndex, "...", ...rightRange];
    }

    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);
  return paginationRange;
}

export { usePagination };
