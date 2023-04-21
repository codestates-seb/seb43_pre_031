import Pagination from 'react-js-pagination';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Paging = ({ page, count, setPage }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={7}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={<ArrowBackIosIcon />}
      nextPageText={<ArrowForwardIosIcon />}
      onChange={setPage}
    />
  );
};

export default Paging;
