// src/pages/Admin/CreateProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    descripcion: '',
    stock: ''
  });
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 1. Valida que se haya seleccionado una imagen
      if (!imagen) {
        setMessage('Por favor, selecciona una imagen.');
        setLoading(false);
        return;
      }

      // 2. Crea un objeto FormData para enviar datos y la imagen
      const form = new FormData();
      for (const key in formData) {
        form.append(key, formData[key]);
      }
      form.append('imagen', imagen);

      // 3. Envía la solicitud POST a tu API
      const response = await axios.post('http://localhost:5000/products', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Producto creado:', response.data);
      setMessage('Producto creado exitosamente.');
      
      // 4. Limpia el formulario después de una subida exitosa
      setFormData({
        nombre: '',
        precio: '',
        categoria: '',
        descripcion: '',
        stock: ''
      });
      setImagen(null);
      if (document.getElementById('imagen')) {
        document.getElementById('imagen').value = '';
      }

    } catch (error) {
      console.error('Error al crear el producto:', error.response?.data || error.message);
      setMessage(`Error: ${error.response?.data?.message || 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Proteína">Proteína</option>
            <option value="Aminoácidos">Aminoácidos</option>
            <option value="Vitaminas">Vitaminas</option>
            <option value="Pre-entreno">Pre-entreno</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleFileChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
      {message && <p style={{ marginTop: '15px', color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default CreateProduct;