import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import './MainPaginate.scss';

const MainPaginate = ({ handlePageClick, totalPage }) => {
  const prevElement = (
    <div className="inline-flex items-center gap-1">
      <i className="bx bx-chevron-left inline-flex items-center justify-center mt-[3px]"></i>
      <span>previous</span>
    </div>
  );
  const nextElement = (
    <div className="inline-flex items-center gap-1">
      <span>next</span>
      <i className="bx bx-chevron-right inline-flex items-center justify-center mt-[3px]"></i>
    </div>
  );
  return (
    <div className="flex w-full justify-center items-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel={nextElement}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage <= 100 ? totalPage : 100}
        previousLabel={prevElement}
        marginPagesDisplayed={3}
        renderOnZeroPageCount={null}
        className="main-paginate"
      />
    </div>
  );
};

MainPaginate.propTypes = {
  handlePageClick: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
};

export default MainPaginate;
