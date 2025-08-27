// src/pages/Cart.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

const SHIPPING_COST = 3000;

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.precio || 0) * item.quantity,
    0
  );
  const total = subtotal + SHIPPING_COST;

  return (
    <div className="bg-gray-100 min-h-screen py-12 font-sans">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Tu Carrito
        </h1>
        <div className="bg-white rounded-lg shadow-xl p-6">
          {cart.length === 0 ? (
            <p className="text-center text-gray-600">El carrito está vacío.</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3">
                <div className="hidden md:flex text-sm text-gray-500 font-semibold border-b pb-2 mb-4">
                  <div className="w-1/2">Nombre del producto</div>
                  <div className="w-1/6 text-right">Precio</div>
                  <div className="w-1/6 text-center">Cantidad</div>
                  <div className="w-1/6 text-right">Sub-total</div>
                </div>

                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={item._id} className="py-4 flex flex-col md:flex-row items-start md:items-center">
                      <div className="w-full md:w-1/2 flex items-center mb-4 md:mb-0">
                        <img
                          src={`http://localhost:5000${item.imagen}`}
                          alt={item.nombre}
                          className="w-24 h-24 object-contain mr-4 rounded-md"
                        />
                        <div>
                          <p className="font-semibold text-gray-800 text-lg">{item.nombre}</p>
                          <p className="text-sm text-gray-500">{item.descripcion}</p>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-500 hover:text-red-700 transition text-sm mt-2"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 flex justify-between md:justify-end items-center md:gap-4 mt-4 md:mt-0">
                        <span className="text-gray-600 text-lg md:w-1/3 md:text-right">
                          {formatPrice(item.precio)}
                        </span>
                        <div className="w-auto md:w-1/3 flex justify-center items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span className="text-gray-800 text-lg font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-cyan-600 text-lg font-bold md:w-1/3 md:text-right">
                          {formatPrice(item.precio * item.quantity)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-inner">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Resumen de la compra</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Sub-total:</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Envío:</span>
                    <span className="font-semibold">{formatPrice(SHIPPING_COST)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-800 border-t pt-4 mt-4">
                    <span>Total:</span>
                    <span className="text-cyan-600">{formatPrice(total)}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  disabled={cart.length === 0}
                  className="bg-cyan-500 text-white font-semibold py-3 rounded-lg hover:bg-cyan-600 transition w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceder a comprar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;