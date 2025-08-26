import { useEffect, useState, useContext } from "react";
import { shopAPI } from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";
import ProductDetailsModal from "../components/ProductDetailsModal.jsx";
import LoginModal from "../components/LoginModal.jsx";

const PromotionBanner = () => (
  <div className="w-full overflow-hidden">
    <img
      src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/f30f460a-f014-434c-9c13-e6f1057a26cd.__CR0,0,970,300_PT0_SX970_V1___.png"
      alt="Banner Promocional C4"
      className="w-full max-h-[900px] object-contain mx-auto"
    />
  </div>
);

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await shopAPI.get("/products");
        if (res.data && Array.isArray(res.data.items)) {
          setProducts(res.data.items);
        } else {
          setError("Respuesta de la API inesperada.");
        }
      } catch (err) {
        setError("Error al cargar los productos. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const openDetailsModal = (id) => {
    setSelectedProductId(id);
    setIsDetailsModalOpen(true);
  };

  const handleAddToCart = () => {
    if (!user) {
      setIsDetailsModalOpen(false);
      setIsLoginModalOpen(true);
    } else {
      // Lógica para añadir al carrito si el usuario está logueado
      console.log(`Producto con ID ${selectedProductId} añadido al carrito`);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-12">No se encontraron productos.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <PromotionBanner />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-4 flex-grow flex flex-col">
                <div className="w-full h-48 flex items-center justify-center mb-4">
                  <img
                    src={`http://localhost:5000${p.imagen}`}
                    alt={p.nombre}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {p.nombre}
                </h3>
                <p className="text-cyan-600 font-extrabold text-xl">
                  {formatPrice(p.precio)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
                <button
                  onClick={() => openDetailsModal(p._id)}
                  className="w-full inline-block bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {isDetailsModalOpen && selectedProductId && (
        <ProductDetailsModal
          productId={selectedProductId}
          onClose={() => setIsDetailsModalOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </div>
  );
}

export default Products;