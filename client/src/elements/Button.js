import styled from 'styled-components';

const Button = (props) => {
  const { text, width, onClick } = props;

  return (
    <Wrapper width={width}>
      <StyledButton onClick={onClick}>{text}</StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${(props) => props.width};
`;
const StyledButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-top: 1px solid ${(props) => props.theme.color.blue200};
  border-radius: ${(props) => props.theme.common.borderRadius};
  background-color: ${(props) => props.theme.color.blue500};
  outline: ${(props) => props.theme.color.blue500} solid 1px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.blue600};
  }

  &:active {
    outline: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
`;

export default Button;
