// ...existing imports...
import { useEffect, useState } from "react";
import { shopAPI } from "../api/axios";

const ProductDetailsModal = ({ productId, onClose, onAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Estado de recomendaciones
  const [recs, setRecs] = useState(null);
  const [recsError, setRecsError] = useState(null);

  // Permite abrir otro producto recomendado en el mismo modal
  const [activeProductId, setActiveProductId] = useState(productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await shopAPI.get(`/products/${activeProductId}`);
        setProduct(res.data);
        setQuantity(1);
      } catch (err) {
        setError("Error al cargar los detalles del producto.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [activeProductId]);

  useEffect(() => {
    if (!product?.slug) return;
    let cancel = false;

    async function fetchRecs() {
      try {
        setRecs(null);
        setRecsError(null);
        const res = await shopAPI.post(`/ai/recommendations`, {
          slug: product.slug,
          limit: 4,
        });
        if (!cancel) setRecs(res.data.recommendations || []);
      } catch (e) {
        if (!cancel) setRecsError("No se pudieron cargar recomendaciones.");
      }
    }
    fetchRecs();
    return () => {
      cancel = true;
    };
  }, [product?.slug]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full text-center">
          Cargando...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full text-center text-red-500">
          {error || "Producto no encontrado."}
          <button onClick={onClose} className="mt-4 text-cyan-600 underline">
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-5xl min-h-[70vh] max-h-[95vh] overflow-y-auto flex flex-col md:flex-row gap-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl z-10"
        >
          &times;
        </button>

        {/* Imagen izquierda */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 rounded-lg">
          <img
            src={`http://localhost:5000${product.imagen}`}
            alt={product.nombre}
            className="w-full h-auto object-contain max-h-[50rem]"
          />
        </div>

        {/* Información derecha */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {product.nombre}
            </h1>
            <div className="flex items-center text-xl text-gray-600">
              <span className="font-bold text-3xl text-cyan-600">
                {formatPrice(product.precio)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {product.stock > 0 ? `Stock disponible: ${product.stock}` : "Agotado"}
              {product.stock > 0 && product.stock <= 5 && (
                <span className="text-orange-500 font-bold ml-2">¡Pocas unidades!</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg text-lg">
              <button
                onClick={decrementQuantity}
                className="py-2 px-4 hover:bg-gray-100 rounded-l-lg"
              >
                -
              </button>
              <span className="py-2 px-4">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className={`py-2 px-4 hover:bg-gray-100 rounded-r-lg ${
                  quantity >= product.stock ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <button
              onClick={() => onAddToCart(product._id, quantity)}
              className="bg-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors flex-grow"
            >
              Agregar al carrito
            </button>
          </div>
          <button className="w-full bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-colors">
            Comprar ahora
          </button>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex border-b border-gray-300 mb-4">
              <span className="font-semibold text-lg text-gray-800 pb-2 border-b-2 border-cyan-500">
                Descripción
              </span>
            </div>
            <p className="text-gray-700">{product.descripcion}</p>
          </div>

          {/* ======= NUEVO: Recomendados por IA (abajo del modal) ======= */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800">Recomendados para ti</h3>

            {!recs && !recsError && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse h-36 rounded-xl bg-gray-200" />
                ))}
              </div>
            )}

            {recsError && (
              <p className="text-sm text-red-600 mt-2">{recsError}</p>
            )}

            {!!recs?.length && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {recs.map((p) => (
                  <button
                    key={p._id}
                    onClick={() => setActiveProductId(p._id)}
                    className="text-left border rounded-xl p-3 hover:shadow transition"
                    title={p.nombre}
                  >
                    <img
                      src={`http://localhost:5000${p.imagen}`}
                      alt={p.nombre}
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <div className="mt-2 text-sm font-medium line-clamp-1">{p.nombre}</div>
                    <div className="text-xs opacity-60">{p.categoria}</div>
                    <div className="text-sm font-semibold mt-1">
                      {formatPrice(p.precio)}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {recs && recs.length === 0 && !recsError && (
              <p className="text-sm opacity-70 mt-2">
                No encontramos recomendaciones para este producto.
              </p>
            )}
          </div>
          {/* ======= FIN Recomendados ======= */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;