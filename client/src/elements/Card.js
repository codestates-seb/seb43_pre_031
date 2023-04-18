import styled from 'styled-components';

const Card = (props) => {
  const { title, description, children } = props;

  return (
    <CardWrapper>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  padding: 2.4rem;
  background-color: white;
  border-radius: ${(props) => props.theme.common.borderRadius};
  border: 1px solid ${(props) => props.theme.color.black075};

  h2 {
    color: ${(props) => props.theme.color.black900};
    margin-bottom: 0.2rem;
  }
  p {
    color: ${(props) => props.theme.color.black700};
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

export default Card;
