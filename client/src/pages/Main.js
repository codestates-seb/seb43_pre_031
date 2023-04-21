import styled from 'styled-components';
import Questions from '../components/Questions';
import { useState } from 'react';
import Button from '../elements/Button';
import { useNavigate } from 'react-router-dom';
import Pagination from '../elements/Pagination';

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

const Main = ({ questions }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;
  // 페이지네이션
  const indexOfLast = currentPage * postPerPage;
  const indexOfFirst = indexOfLast - postPerPage;
  const currentQuestions = (questions) => {
    let currentQuestions = 0;
    currentQuestions = questions.slice(indexOfFirst, indexOfLast);
    return currentQuestions;
  };

  return (
    <Container>
      <Title>
        <h1>All Questions</h1>
        <Button text="Ask Question" onClick={() => navigate('/question/ask')} />
      </Title>
      <h2>{questions.length} questions</h2>
      <Questions questions={currentQuestions(questions)} />
      <Pagination
        postPerPage={postPerPage}
        totalQuestions={questions.length}
        paginate={setCurrentPage}
      />
    </Container>
  );
};

export default Main;
