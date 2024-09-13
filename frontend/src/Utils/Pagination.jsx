import React from "react";
import { Button } from "react-bootstrap";
import { GrFormPrevious } from "react-icons/gr";
import { useTheme } from "../Context/TheamContext/ThemeContext";

const Pagination = ({
  currentPage,
  pageNumbers,
  handlePaginationPrev,
  handlePaginationNext,
  setCurrentPage,
  filteredDataLength,
  itemsPerPage,
}) => {
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;

  const {darkMode} = useTheme()

  return (
    <div className="d-flex w-100 justify-content-between">
      <div style={{color : darkMode ? "black" : "White"}}  className="my-auto">
        Showing {indexOfFirstItem + 1} to{" "}
        {Math.min(indexOfLastItem, filteredDataLength)} of {filteredDataLength} results
      </div>
      <div className="d-flex align-items-center gap-1">
      
      <Button
         className="btn text-black bg-light rounded-5 border shadow-sm py-1 mx-1"
        onClick={handlePaginationPrev}
        disabled={currentPage === 1}
      >
        <GrFormPrevious className="my-auto" /> Previous
      </Button>
      <div className="pagination d-flex flex-nowrap gap-2">
        {pageNumbers.map((number) => (
          <Button
            key={number}
            style={{
              border: "none",
              color: "gray",
              borderRadius:'50%',
              height:'25px', width:'25px', display:'flex', justifyContent:'center', alignItems:'center'
            }}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ?  "bg-black border-white border rounded-5 text-white" : darkMode ? "bg-light rounded-5 text-black" : "bg-dark rounded-5 text-white"}
          >
            {number}
          </Button>
        ))}
      </div>
      <Button
        onClick={handlePaginationNext}
        className="btn text-black bg-light rounded-5 border shadow-sm py-1 mx-1"
        disabled={indexOfLastItem >= filteredDataLength}
      >
        <span className="">Next</span>{" "}
        <GrFormPrevious className="my-auto" style={{ rotate: "180deg" }} />
      </Button>
    </div>
    </div>

  );
};

export default Pagination;
