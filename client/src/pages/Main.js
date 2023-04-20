import styled from 'styled-components';
import Questions from '../components/Questions';

<<<<<<< HEAD
const Container = styled.div`
  width: 100vw;
  display: flex;
  height: 200vh;
  position: relative;
  .content {
    margin: 0 auto;
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;
=======
const Container = styled.div``;
>>>>>>> a4b6f240650700f61b6db57079e9201696976e7a

const Main = ({ questions }) => {
  return (
    <Container>
      <Questions questions={questions} />
    </Container>
  );
};

export default Main;
