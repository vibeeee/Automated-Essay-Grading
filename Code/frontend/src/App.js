import './App.css';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Header from './components/Header';
import Start from './components/Start';


import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Results from './components/Results';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start/:id" element={<Start/>} />
        <Route path="/quiz/:id" element={<Quiz/>} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
