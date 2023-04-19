import styled from 'styled-components';
import Button from '../elements/Button';
import { useNavigate } from 'react-router-dom';
import QuestionList from './QuestionList';

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

const Questions = ({ questions }) => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Title>
          <h1>All Questions</h1>
          <Button
            text="Ask Question"
            onClick={() => navigate('/question/ask')}
          />
        </Title>
        <h2>{questions.length} questions</h2>
        {questions.map((question) => (
          <QuestionList key={question.id} question={question} />
        ))}
      </Container>
    </>
  );
};

export default Questions;
