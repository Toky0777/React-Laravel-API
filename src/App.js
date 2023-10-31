import './App.css';
import ListPost from './pages/ListPost';
import LoginPage from './pages/LoginPage';
import MyForm from './pages/MyForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import View from './pages/View';


function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" exact element={<LoginPage/>} />
            <Route path="/Post" element={<MyForm/>} />
            <Route path="/List" element={<ListPost/>} />
            <Route path="/View" element={<View/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
