import styled, { css } from 'styled-components';

const Button = (props) => {
  const { text, width, onClick } = props;

  return (
    <StyledButton onClick={onClick} width={width}>
      {text}
    </StyledButton>
  );
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
  ${(props) =>
    props.width &&
    css`
      display: block;
      width: ${(props) => props.width};
    `}

  &:hover {
    background-color: ${(props) => props.theme.color.blue600};
  }

  &:active {
    outline: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
`;

export default Button;
