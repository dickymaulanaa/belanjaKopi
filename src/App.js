import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Product from './pages/Product';
import DetailProduct from './pages/DetailProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Product />} />
        <Route path='/detail-product' element={<DetailProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
