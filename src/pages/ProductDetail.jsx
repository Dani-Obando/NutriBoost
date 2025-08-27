// src/pages/ProductDetail.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { shopAPI } from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.jsx";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!user) {
      toast.error("Debes iniciar sesión para ver los detalles del producto.");
      navigate("/login");
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await shopAPI.get(`/products/${id}`);

        // Si la API devuelve { product: {...} }, usamos res.data.product
        // Si devuelve el objeto directo {...}, usamos res.data
        const fetched =
          res.data && res.data.product ? res.data.product : res.data;

        setProduct(fetched);
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError("Error al cargar el producto. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, user, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${quantity} x ${product.nombre} agregado al carrito!`);
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== "number") return "";
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return <div className="text-center py-12">Cargando detalles del producto...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Producto no encontrado.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Imagen */}
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
            <img
              src={`http://localhost:5000${product.imagen}`}
              alt={product.nombre}
              className="max-h-96 object-contain rounded-lg"
            />
          </div>

          {/* Info */}
          <div className="flex-grow w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.nombre}</h1>
            <p className="text-cyan-600 font-extrabold text-3xl mb-4">
              {formatPrice(product.precio)}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.descripcion}
            </p>

            {/* Cantidad */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium text-gray-700">Cantidad:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-lg"
                >
                  -
                </button>
                <span className="px-4 py-2 text-lg font-semibold text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) =>
                      Math.min(product.stock || 99, q + 1)
                    )
                  }
                  className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botón */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-cyan-500 text-white font-semibold py-3 rounded-lg hover:bg-cyan-600 transition-colors text-lg"
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
