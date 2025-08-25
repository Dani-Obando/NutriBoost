import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { shopAPI } from "../api/axios";

function Cart() {
  const { cart, removeFromCart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const detalles = cart.map((item) => ({
        productId: item._id,
        cantidad: item.quantity,
        subtotal: item.precio * item.quantity,
      }));
      const data = { detalles, total };
      await shopAPI.post("/orders", data);
      alert("Orden colocada exitosamente");
      setCart([]);
      navigate("/orders");
    } catch (err) {
      console.error("Error creando orden", err);
      alert("Error al colocar la orden");
    }
  };

  return (
    <div className="py-12">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Carrito</h1>
        {cart.length === 0 ? (
          <p className="text-gray-600">El carrito está vacío.</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>
                    {item.nombre} x {item.quantity} - $
                    {(item.precio * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-bold text-lg">Total: ${total.toFixed(2)}</p>
            <button
              onClick={placeOrder}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full mt-4"
            >
              Colocar Orden
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
