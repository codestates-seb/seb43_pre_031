import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html { 
    font-size: 10px; 
  }

  body{
    font-size: 1.3rem;
  }
  
  a {color: ${(props) =>
    props.theme.color.blue600}; text-decoration: none; outline: none}
  a:hover, a:active { color:${(props) => props.theme.color.blue400}}
`;

export default GlobalStyle;
