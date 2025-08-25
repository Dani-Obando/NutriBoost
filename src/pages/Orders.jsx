import { useEffect, useState } from "react";
import { shopAPI } from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await shopAPI.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error obteniendo órdenes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="p-6 text-center">Cargando...</p>;

  return (
    <div className="py-12">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Mis Órdenes</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600">No hay órdenes.</p>
        ) : (
          <ul className="space-y-6">
            {orders.map((order) => (
              <li
                key={order._id}
                className="bg-white border rounded-lg p-6 shadow-md"
              >
                <p className="mb-2">
                  <strong>ID:</strong> {order._id}
                </p>
                <p className="mb-2">
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
                <p className="mb-2">
                  <strong>Fecha:</strong>{" "}
                  {new Date(order.fecha).toLocaleString()}
                </p>
                <ul className="mt-2 space-y-1">
                  {order.detalles.map((detalle, idx) => (
                    <li key={idx} className="text-gray-600">
                      Producto ID: {detalle.productId} - Cantidad:{" "}
                      {detalle.cantidad} - Subtotal: $
                      {detalle.subtotal.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Orders;
