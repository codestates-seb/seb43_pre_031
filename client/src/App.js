import './App.css';
// import Main from './pages/Main';
import AskQuestion from './pages/AskQuestion';
import DetailQuestion from './pages/DetailQuestion';
import EditAllPosts from './pages/EditAllPosts';
// import Input from './elements/Input';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    //   <Main />
    //   <div className="temp-test">
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path="/" element={<AskQuestion />} />
    //         <Route path="/question/:id" element={<DetailQuestion />} />
    //         <Route path="/question/editq/:id" element={<EditAllPosts />} />
    //         <Route
    //           path="/question/edita/:id"
    //           element={<EditAllPosts answer />}
    //         />
    //       </Routes>
    //     </BrowserRouter>

    //     <Input type="text" label="ggg" />
    //   </div>
    // </div>
    <div className="temp-test">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AskQuestion />} />
          <Route path="/questions/:id" element={<DetailQuestion />} />
          <Route path="/questions/editq/:id" element={<EditAllPosts />} />
          <Route
            path="/questions/edita/:id"
            element={<EditAllPosts answer />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
