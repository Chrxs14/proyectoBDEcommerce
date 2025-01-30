import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register';
import CreateProduct from './pages/CreateProduct/CreateProduct'; // Importa el nuevo componente
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-product"
          element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;