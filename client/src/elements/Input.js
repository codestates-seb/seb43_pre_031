import styled from 'styled-components';

const Input = (props) => {
  const { type, placeholder, value, label, onChange } = props;
  if (label) {
    <div>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledInput
        id={label}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={value}
        autoComplete="off"
      />
    </div>;
  }

  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={value}
      autoComplete="off"
    />
  );
};

const StyledLabel = styled.label`
  width: 100%;
  display: inline-block;
  padding: 0.8rem 0.9rem;
  margin: 0 0 0.3rem 0.2rem;
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
