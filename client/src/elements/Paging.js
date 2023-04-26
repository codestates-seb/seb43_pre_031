import Pagination from 'react-js-pagination';
import styled from 'styled-components';

const Paging = ({ page, count, setPage }) => {
  return (
    <Container>
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={'Prev'}
        nextPageText={'Next'}
        onChange={setPage}
      />
    </Container>
  );
};

export default Paging;

const Container = styled.div`
  margin-left: 2rem;
  margin-bottom: 5rem;
  .pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border: 1px solid ${(props) => props.theme.color.black200};
    border-radius: 3px;
    margin-right: 0.5rem;
    &:hover {
      background-color: ${(props) => props.theme.color.black100};
    }
  }

  ul.pagination li a {
    padding: 1rem;
    text-decoration: none;
    color: ${(props) => props.theme.color.black600};
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: ${(props) => props.theme.color.orange400};
    border: none;
  }
  .page-selection {
    /* width: 48px;
    height: 30px;
    color: #808080; */
  }
`;
