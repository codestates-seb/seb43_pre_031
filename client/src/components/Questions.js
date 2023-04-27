import styled from 'styled-components';
import QuestionList from './QuestionList';

const Container = styled.div``;

const Questions = ({ questions }) => {
  return (
    <Container>
      {questions.map((question) => (
        <QuestionList key={question.id} question={question} />
      ))}
    </Container>
  );
};

export default Questions;
