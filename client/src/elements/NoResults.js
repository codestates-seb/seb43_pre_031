import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

const NoResults = ({ keyword }) => {
  return (
    <Container>
      <SearchIcon />
      <h2>
        We could not find anything for <Keyword>{keyword}</Keyword>
      </h2>
      <span>Try different or less specific keywords.</span>
    </Container>
  );
};

export default NoResults;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    font-size: 12rem;
    color: ${(props) => props.theme.color.black200};
  }
  h2 {
    display: flex;
    align-items: center;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }
  span {
    font-size: 1.5rem;
  }
`;

const Keyword = styled.div`
  font-weight: 700;
  margin-left: 0.5rem;
`;
