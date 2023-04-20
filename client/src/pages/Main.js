import styled from 'styled-components';
import Questions from '../components/Questions';

const Container = styled.div``;
>>>>>>>>> Temporary merge branch 2

const Main = ({ questions }) => {
  return (
    <Container>
      <Questions questions={questions} />
    </Container>
  );
};

export default Main;
