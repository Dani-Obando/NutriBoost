import { useEffect, useState, useContext } from "react";
import { shopAPI } from "../api/axios";
import { CartContext } from "../context/CartContext.jsx";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await shopAPI.get("/products");
        if (res.data && Array.isArray(res.data.items)) {
          setProducts(res.data.items);
        } else {
          setError("Respuesta de la API inesperada.");
          console.error("Respuesta de la API inesperada:", res.data);
        }
      } catch (err) {
        console.error("Error al obtener los productos:", err);
        setError(
          "Error al cargar los productos. Por favor, inténtalo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No se encontraron productos.</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:5000${p.imagen}`} 
                alt={p.nombre}
                className="w-full h-48 object-cover"
                
              />
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{p.nombre}</h3>
                <p className="text-gray-600 mb-2">${p.precio.toFixed(2)}</p>
                <p className="text-gray-500 text-sm mb-4">{p.descripcion}</p>
                <button
                  onClick={() => addToCart(p)}
                  className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-full"
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
