import styled from 'styled-components';

const Container = styled.footer`
  grid-area: footer;
  background-color: ${(props) => props.theme.color.black800};
  height: 20rem;
`;

const Footer = () => {
  return <Container>Footer</Container>;
};

export default Footer;
