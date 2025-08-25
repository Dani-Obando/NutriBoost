// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateProduct from './pages/Admin/CreateProduct'; // La ruta a tu componente

function App() {
  return (
    <Router>
      <Routes>
        {/* Otras rutas */}
        <Route path="/admin" element={<CreateProduct />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;