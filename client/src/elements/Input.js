import styled from 'styled-components';

const Input = (props) => {
  const { type, placeholder, value, defaultValue, label, onChange } = props;

  return (
    <div>
      {label && <StyledLabel htmlFor={label}>{label}</StyledLabel>}
      <StyledInput
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        autoComplete="off"
      />
      {/* {error !== '' && <Error>{error}</Error>} */}
    </div>
  );
};

const StyledLabel = styled.label`
  display: inline-block;
  margin: 0 0 0.3rem 0.2rem;
  font-size: 1.5rem;
  font-weight: 700;
`;
const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem 0.9rem;
  border-radius: ${(props) => props.theme.common.borderRadius};
  border: 1px solid ${(props) => props.theme.color.black200};
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.color.black200};
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.color.blue300};
    outline: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
`;

export default Input;
