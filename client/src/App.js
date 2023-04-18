import './App.css';

import Main from './pages/Main';
import AskQuestion from './pages/AskQuestion';
import DetailQuestion from './pages/DetailQuestion';

function App() {
  return (
    <div className="App">
      <Main />
      <div className="temp-test">
        <AskQuestion />
        <DetailQuestion />
      </div>
    </div>

  );
}

export default App;
