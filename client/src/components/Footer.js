import styled from 'styled-components';

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  background-color: ${(props) => props.theme.color.black800};
  height: 20rem;
  width: 100%;
`;

const Footer = () => {
  return <Container>Footer</Container>;
};

export default Footer;
