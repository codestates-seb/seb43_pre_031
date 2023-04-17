import styled from 'styled-components';

const Button = (props) => {
  const { text, onClick } = props;

  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

const StyledButton = styled.button`
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
