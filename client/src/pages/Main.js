import styled from 'styled-components';
import Questions from '../components/Questions';
// import Aside from '../components/Aside';

const Container = styled.div`
  /* width: 100vw;
  display: flex;
  height: 200vh;
  position: relative;
  .content {
    margin: 0 auto;
    width: 70%;
    height: 100%;
    display: flex;
  } */
`;

const Main = ({ questions }) => {
  return (
    <Container>
      <div className="content">
        <Questions questions={questions} />
      </div>
    </Container>
  );
};

export default Main;
