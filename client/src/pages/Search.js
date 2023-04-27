import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../utils/API';
import Questions from '../components/Questions';
import Button from '../elements/Button';
import Paging from '../elements/Paging';
import NoResults from '../elements/NoResults';

const Search = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();
  const SIZE = 10;
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0); // 총 질문 갯수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [indexOfLast, setIndexOfLast] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirst, setIndexOfFirst] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스

  useEffect(() => {
    axios
      .get(`${API}/questions/search?keyword=${keyword}&size=${SIZE}`)
      .then((res) => {
        setCount(res.data.pageInfo.totalElements);
        setCurrentPage(res.data.pageInfo.page);
        setResult(res.data.data);
        setIndexOfLast(currentPage * SIZE);
        setIndexOfFirst(indexOfLast - SIZE);
      });
  }, [keyword, currentPage, indexOfLast, indexOfFirst]);
  const setPage = (e) => {
    setCurrentPage(e);
  };
  return (
    <Container>
      <Title>
        <div>
          <h1>Search Results</h1>
          <Button
            text="Ask Question"
            onClick={() => navigate('/question/ask')}
          />
        </div>
        <h2>Results for {keyword}</h2>
        <h3>{result.length} results</h3>
      </Title>
      {result.length !== 0 ? (
        <>
          <Questions questions={result} />
          <Paging page={currentPage} count={count} setPage={setPage} />
        </>
      ) : (
        <NoResults keyword={keyword} />
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  margin-top: 6rem;
  width: 100%;
  margin-left: 18rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 0 2.5rem 2.5rem;
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h1 {
    font-size: 3rem;
    font-weight: 600;
  }
  h2 {
    margin: 1rem 0;
  }
  h2,
  h3 {
    font-weight: 400;
  }
`;
