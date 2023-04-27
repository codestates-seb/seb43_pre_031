import styled from 'styled-components';
import Questions from '../components/Questions';
import Button from '../elements/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Paging from '../elements/Paging';
import axios from 'axios';
import { API } from '../utils/API';
import { getCookie } from '../lib/Cookies';

const Main = () => {
  const navigate = useNavigate();
  const SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [count, setCount] = useState(0); // 총 질문 갯수
  const [questions, setQuestions] = useState([]); // 현재 페이지 질문들
  const [indexOfLast, setIndexOfLast] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirst, setIndexOfFirst] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스

  const getQuestions = async () => {
    await axios
      .get(`${API}/questions?page=${currentPage}&size=${SIZE}`)
      .then((res) => {
        setCount(res.data.pageInfo.totalElements);
        setCurrentPage(res.data.pageInfo.page);
        setQuestions(res.data.data);
        setIndexOfLast(currentPage * SIZE);
        setIndexOfFirst(indexOfLast - SIZE);
      });
  };

  useEffect(() => {
    getQuestions();
  }, [currentPage, indexOfLast, indexOfFirst]);

  const setPage = (e) => {
    setCurrentPage(e);
  };

  const checkUser = () => {
    if (getCookie('accessToken') === undefined) {
      navigate('/users/login');
    } else {
      navigate('/question/ask');
    }
  };

  return (
    <Container>
      <Title>
        <h1>All Questions</h1>
        <Button text="Ask Question" onClick={checkUser} />
      </Title>
      {count !== 0 ? (
        <h2>{count} questions</h2>
      ) : (
        <h2>등록된 질문이 없습니다.</h2>
      )}
      <Questions questions={questions} />
      <Paging page={currentPage} count={count} setPage={setPage} />
    </Container>
  );
};

export default Main;

const Container = styled.div`
  margin-top: 6rem;
  width: 100%;
  margin-left: 18rem;
  h2 {
    padding: 0 2.5rem 2.5rem 2.5rem;
    font-size: 2rem;
    font-weight: 400;
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
