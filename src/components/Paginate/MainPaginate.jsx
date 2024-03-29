import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import './MainPaginate.scss';
import { useForceRerender, useResponsive } from '~/hooks';

const MainPaginate = ({ handlePageClick, totalPage, currentPage }) => {
  useForceRerender([currentPage]);
  const prevElement = (
    <i className="bx bx-chevron-left inline-flex items-center justify-center mt-[1px] !text-lg"></i>
  );
  const nextElement = (
    <i className="bx bx-chevron-right inline-flex items-center justify-center mt-[1px] !text-lg"></i>
  );

  const { isMobile } = useResponsive();

  return (
    <div className="flex w-full justify-center items-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel={nextElement}
        onPageChange={handlePageClick}
        pageRangeDisplayed={!isMobile ? 5 : 3}
        marginPagesDisplayed={!isMobile ? 1 : 0}
        pageCount={totalPage <= 99 ? totalPage : 99}
        previousLabel={prevElement}
        // initialPage={currentPage - 1}
        forcePage={currentPage - 1}
        disableInitialCallback={true}
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
