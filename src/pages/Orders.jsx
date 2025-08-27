// src/pages/Orders.jsx
import { useEffect, useState } from "react";
import { shopAPI } from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
    }).format(price);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await shopAPI.get("/orders");
        // Para depurar, puedes ver la estructura exacta de tus órdenes aquí:
        // console.log(res.data); 
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
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mis Pedidos</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600 p-6 bg-white rounded-lg shadow text-center">No has realizado ningún pedido todavía.</p>
        ) : (
          <ul className="space-y-8">
            {orders.map((order) => (
              <li
                key={order._id}
                className="bg-white border rounded-lg p-6 shadow-lg"
              >
                {/* SECCIÓN 1: RESUMEN DEL PEDIDO */}
                <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ID del Pedido</p>
                    <p className="font-mono text-gray-800 text-sm">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fecha</p>
                    {/* CORRECCIÓN DE FECHA: Se usa 'createdAt' en lugar de 'fecha' */}
                    <p className="text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                   <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-xl text-cyan-600">{formatPrice(order.total)}</p>
                  </div>
                </div>

                {/* SECCIÓN 2: DATOS DEL CLIENTE (NUEVO) */}
                {order.cliente && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 pb-4 border-b">
                    <div>
                      <h3 className="font-bold text-gray-700 mb-2">Información del Cliente</h3>
                      <p className="text-gray-600"><strong>Nombre:</strong> {order.cliente.nombre} {order.cliente.apellidos}</p>
                      <p className="text-gray-600"><strong>Correo:</strong> {order.cliente.correo}</p>
                      <p className="text-gray-600"><strong>Teléfono:</strong> {order.cliente.telefono}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-700 mb-2">Detalles de Entrega</h3>
                      <p className="text-gray-600"><strong>Método de pago:</strong> <span className="capitalize">{order.cliente.metodoPago}</span></p>
                      <p className="text-gray-600"><strong>Método de entrega:</strong> <span className="capitalize">{order.cliente.metodoEntrega}</span></p>
                      {order.cliente.metodoEntrega === 'envio' && (
                        <address className="mt-2 text-gray-600 not-italic">
                          <strong>Dirección:</strong> {order.cliente.direccionExacta}, {order.cliente.canton}, {order.cliente.provincia}.
                        </address>
                      )}
                    </div>
                  </div>
                )}
                
                {/* SECCIÓN 3: PRODUCTOS DEL PEDIDO */}
                <h3 className="font-bold text-gray-700 mb-2">Productos:</h3>
                <ul className="space-y-2">
                  {order.detalles.map((detalle, idx) => (
                    <li key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <span className="font-semibold text-gray-800">{detalle.nombre}</span>
                        <span className="text-gray-600"> &times; {detalle.cantidad}</span>
                      </div>
                      <span className="text-gray-700 font-medium">{formatPrice(detalle.subtotal)}</span>
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