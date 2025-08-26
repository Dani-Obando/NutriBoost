import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shopAPI } from '../api/axios';
import { AuthContext } from '../context/AuthContext.jsx';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirige si el usuario no está logueado
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await shopAPI.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Error al cargar el producto. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, user, navigate]);

  if (loading) {
    return <div className="text-center py-12">Cargando detalles del producto...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }
  
  if (!product) {
      return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
            <img 
              src={`http://localhost:5000${product.imagen}`}
              alt={product.nombre}
              className="max-h-96 object-contain rounded-lg"
            />
          </div>
          <div className="flex-grow w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.nombre}</h1>
            <p className="text-cyan-600 font-extrabold text-3xl mb-6">
              {new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC", minimumFractionDigits: 0 }).format(product.precio)}
            </p>
            <p className="text-gray-600 mb-4">{product.descripcion}</p>
            <button
              className="w-full bg-cyan-500 text-white font-semibold py-3 rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;