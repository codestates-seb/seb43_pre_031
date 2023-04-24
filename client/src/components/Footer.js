import styled from 'styled-components';

const Container = styled.footer`
  position: absolute;
  background-color: ${(props) => props.theme.color.black800};
  height: 30rem;
  width: 100%;
  color: white;
  padding: 3rem 0;

  .content {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 0 auto;
    img {
      width: 6rem;
      height: 6rem;
    }
    div {
      display: flex;
      flex-direction: column;
      margin-left: 5rem;
      h3 {
        text-transform: uppercase;
        margin-bottom: 1.5rem;
        color: ${(props) => props.theme.color.black200};
        font-weight: 700;
        font-size: 1.3rem;
      }
      span {
        margin-bottom: 0.6rem;
        font-size: 1.2rem;
        color: ${(props) => props.theme.color.black350};
      }
    }
  }
`;

const Footer = () => {
  if (window.location.pathname === '/users/login') return null;
  return (
    <Container>
      <div className="content">
        <img
          src="/assets/128px-Stack_Overflow_icon.svg.png"
          alt="로고 작은 이미지"
        />
        <div>
          <h3>Stack Overflow</h3>
          <span>Questions</span>
          <span>Help</span>
        </div>
        <div>
          <h3>Products</h3>
          <span>Teams</span>
          <span>Advertising</span>
          <span>Collectives</span>
          <span>Talent</span>
        </div>
        <div>
          <h3>Company</h3>
          <span>About</span>
          <span>Press</span>
          <span>Work Here</span>
          <span>Legal</span>
          <span>Privacy Policy</span>
          <span>Teams of Service</span>
          <span>Contact us</span>
          <span>Cookie Settings</span>
          <span>Cookie Policy</span>
        </div>
        <div>
          <h3>Stack Exchage Network</h3>
          <span>Technology</span>
          <span>Culture & recreation</span>
          <span>Life & arts</span>
          <span>Science</span>
          <span>Professional</span>
          <span>Business</span>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
