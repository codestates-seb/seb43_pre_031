import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import theme from './utils/Theme';
import GlobalStyle from './utils/GlobalStyle';
// import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ThemeProvider theme={theme}>
  //   <BrowserRouter>
  //     <GlobalStyle />
  //     <App />
  //   </BrowserRouter>
  // </ThemeProvider>
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
