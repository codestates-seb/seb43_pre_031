import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../utils/API';
import Questions from '../components/Questions';
import Button from '../elements/Button';
import Paging from '../elements/Paging';

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
        <h1>검색 키워드 : {keyword}</h1>
        <Button text="Ask Question" onClick={() => navigate('/question/ask')} />
      </Title>
      {result.length !== 0 ? (
        <>
          <Questions questions={result} />
          <Paging page={currentPage} count={count} setPage={setPage} />
        </>
      ) : (
        <h2>검색 결과가 없습니다.</h2>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  margin-top: 6rem;
  width: 100%;
  margin-left: 18rem;
  h2 {
    margin-left: 2.5rem;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 0 2.5rem 2.5rem;
  h1 {
    font-size: 3rem;
  }
`;
