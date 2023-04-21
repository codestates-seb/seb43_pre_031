import styled from 'styled-components';
import Questions from '../components/Questions';
import Button from '../elements/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Paging from '../elements/Paging';

const Main = ({ questions }) => {
  const navigate = useNavigate();

  // 페이지네이션 상태
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수
  const [indexOfLast, setIndexOfLast] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirst, setIndexOfFirst] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentQuestions, setCurrentQuestions] = useState([]); // 현재 페이지에서 보여지는 아이템들

  useEffect(() => {
    setCount(questions.length);
    setIndexOfLast(currentPage * postPerPage);
    setIndexOfFirst(indexOfLast - postPerPage);
    setCurrentQuestions(questions.slice(indexOfFirst, indexOfLast));
  }, [currentPage, indexOfLast, indexOfFirst, questions, postPerPage]);

  const setPage = (error) => {
    setCurrentPage(error);
  };
  return (
    <Container>
      <Title>
        <h1>All Questions</h1>
        <Button text="Ask Question" onClick={() => navigate('/question/ask')} />
      </Title>
      <h2>{questions.length} questions</h2>
      <Questions questions={currentQuestions} />
      <Paging page={currentPage} count={count} setPage={setPage} />
    </Container>
  );
};

export default Main;

const Container = styled.div`
  margin-top: 6rem;
  height: auto;
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
