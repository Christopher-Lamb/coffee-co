import React from "react";
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BiDotsHorizontal } from "react-icons/bi";
import { useCoffeeContext } from "../../context/CoffeeContext";
import { setSearchParam } from "../../utils/searchParameters";

interface PageClickData {
  selected: number;
}

interface PaginationProps {}

const Pagination: React.FC<PaginationProps> = () => {
  const { pageNum, totalPages, setPage } = useCoffeeContext();

  const handlePageClick = (data: PageClickData) => {
    if (setPage) {
      setSearchParam("page", data.selected.toString());
      setPage(data.selected);
    }
  };

  const boxClass = "w-small h-small flex justify-center";

  return (
    <div className="mx-auto">
      <ReactPaginate
        previousLabel={<FaAngleLeft size={"1.4rem"} />}
        pageRangeDisplayed={2}
        initialPage={pageNum || 0}
        marginPagesDisplayed={1}
        nextLabel={<FaAngleRight size={"1.4rem"} />}
        breakLabel={
          <div className="h-5 overflow-hidden">
            <BiDotsHorizontal size={"1.6rem"} />
          </div>
        }
        forcePage={pageNum || 0}
        pageCount={totalPages || 10} // Total number of pages
        // marginPagesDisplayed={1}
        // pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex flex-wrap justify-center "}
        pageClassName={"bg-primary-lighter text-white hover:bg-accent hover:text-primary hover:scale-110 " + boxClass}
        pageLinkClassName={"items-center " + boxClass}
        nextLinkClassName={"flex items-center " + boxClass}
        previousLinkClassName={"flex items-center " + boxClass}
        breakLinkClassName={"flex items-end " + boxClass}
        // subContainerClassName={"pages pagination"}
        activeLinkClassName={"active bg-secondary scale-110"}
      />
    </div>
  );
};

export default Pagination;
