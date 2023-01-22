import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import './style.scss';
import './index.css';

import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/" exact/>
            </Route>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Register/>} path="/register"/>
          </Routes>
      </Router>
    </div>
  );
}
export default App;
