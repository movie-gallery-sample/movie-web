"use client";

import { usePagination } from "@/lib/hooks/usePagination";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";

interface Props<T> {
  className?: string;
  data: T[];
  options: {
    currentPage: number;
    setPage: (value: number) => void;
    pageSize: number;
    totalCount: number;
    siblingCount: number;
  };
}
const Pagination = <T,>({ className, data = [], options }: Props<T>) => {
  const { setPage, currentPage, pageSize, totalCount, siblingCount } = options;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  const onNext = () => {
    setPage(currentPage + 1);
  };

  const onPrevious = () => {
    setPage(currentPage - 1);
  };

  const lastPage =
    paginationRange && paginationRange[paginationRange.length - 1];

  if (!data?.length) return;

  return (
    <div
      className={cn(
        "w-auto mt-[24px] flex items-center justify-between py-4 gap-2 text-regular font-bold",
        className
      )}
    >
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={cn("mx-2")}
      >
        Prev
      </button>
      {paginationRange?.map((pageNumber) => {
        if (pageNumber === "...") {
          return (
            <button key={pageNumber} className="">
              <Ellipsis size={24} />
            </button>
          );
        }

        return (
          <button
            key={pageNumber}
            className={cn(
              "bg-cardColor py-1 px-3 rounded",
              currentPage === pageNumber && "bg-primary hover:bg-primaryHover"
            )}
            onClick={() => setPage(pageNumber as number)}
          >
            <p>{pageNumber}</p>
          </button>
        );
      })}

      <button
        onClick={onNext}
        disabled={currentPage === lastPage}
        className={cn("mx-2")}
      >
        <p>Next</p>
      </button>
    </div>
  );
};

export default Pagination;
