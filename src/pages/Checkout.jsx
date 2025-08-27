import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { shopAPI } from "../api/axios";

const SHIPPING_COST = 3000;

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    pais: "Costa Rica",
    provincia: "",
    canton: "",
    direccionExacta: "",
    codigoPostal: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState("envio");
  const [paymentMethod, setPaymentMethod] = useState("tarjeta");
  const [cardData, setCardData] = useState({
    numeroTarjeta: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC" }).format(price);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.precio || 0) * item.quantity, 0);
  const finalShippingCost = deliveryMethod === "envio" ? SHIPPING_COST : 0;
  const total = subtotal + finalShippingCost;
  
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleCardChange = (e) => setCardData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      return toast.error("Tu carrito está vacío.");
    }
    if (deliveryMethod === 'envio' && (!formData.direccionExacta || !formData.provincia || !formData.canton)) {
      return toast.error("Por favor, completa los detalles de la dirección.");
    }
    if (paymentMethod === 'tarjeta' && (!cardData.numeroTarjeta || !cardData.expMonth || !cardData.expYear || !cardData.cvv)) {
      return toast.error("Por favor, completa los datos de la tarjeta.");
    }

    const loadingToast = toast.loading('Procesando tu pedido...');

    try {
     const detalles = cart.map((item) => ({
  productId: item._id,
  nombre: item.nombre,
  cantidad: item.quantity,
  precio: item.precio,   // por si el schema lo pide
  subtotal: item.precio * item.quantity,
}));

      
      const orderData = { 
        cliente: { ...formData, metodoEntrega: deliveryMethod, metodoPago: paymentMethod },
        detalles, 
        total 
      };

      await shopAPI.post("/orders", orderData);
      
      toast.dismiss(loadingToast);
      toast.success("¡Pedido realizado exitosamente!");

      setCart([]);
      navigate("/orders");
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error("Error creando la orden", err);
      toast.error("Error al procesar el pedido. Intenta de nuevo.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 font-sans">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Finalizar Compra
        </h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos de Facturación</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input type="text" name="nombre" id="nombre" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" value={formData.nombre} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos</label>
                  <input type="text" name="apellidos" id="apellidos" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" value={formData.apellidos} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                  <input type="email" name="correo" id="correo" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" value={formData.correo} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input type="tel" name="telefono" id="telefono" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" value={formData.telefono} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dirección de envío</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                 <div>
                  <label htmlFor="pais" className="block text-sm font-medium text-gray-700">País</label>
                  <select name="pais" id="pais" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" value={formData.pais} onChange={handleChange}>
                    <option value="Costa Rica">Costa Rica</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">Provincia</label>
                  <input type="text" name="provincia" id="provincia" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" value={formData.provincia} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="canton" className="block text-sm font-medium text-gray-700">Cantón</label>
                  <input type="text" name="canton" id="canton" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" value={formData.canton} onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="direccionExacta" className="block text-sm font-medium text-gray-700">Dirección exacta</label>
                  <textarea name="direccionExacta" id="direccionExacta" rows="3" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" value={formData.direccionExacta} onChange={handleChange}></textarea>
                </div>
                <div>
                  <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700">Código postal</label>
                  <input type="text" name="codigoPostal" id="codigoPostal" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" value={formData.codigoPostal} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Método de entrega</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <label className={`flex items-center p-4 rounded-lg border w-full cursor-pointer ${deliveryMethod === 'envio' ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 bg-white'}`}>
                  <input type="radio" name="deliveryMethod" value="envio" checked={deliveryMethod === "envio"} onChange={() => setDeliveryMethod("envio")} className="form-radio text-cyan-600 focus:ring-cyan-500" />
                  <span className="ml-3 text-gray-700 font-medium">Envío a domicilio</span>
                </label>
                <label className={`flex items-center p-4 rounded-lg border w-full cursor-pointer ${deliveryMethod === 'retiro' ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 bg-white'}`}>
                  <input type="radio" name="deliveryMethod" value="retiro" checked={deliveryMethod === "retiro"} onChange={() => setDeliveryMethod("retiro")} className="form-radio text-cyan-600 focus:ring-cyan-500" />
                  <span className="ml-3 text-gray-700 font-medium">Retiro en tienda (gratis)</span>
                </label>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Pago</h2>
              <div className="p-4 border rounded-md">
                <div className="flex gap-4 mb-4">
                   <button type="button" onClick={() => setPaymentMethod("tarjeta")} className={`px-4 py-2 text-sm rounded-md border font-medium ${paymentMethod === 'tarjeta' ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>Tarjeta</button>
                   <button type="button" onClick={() => setPaymentMethod("paypal")} className={`px-4 py-2 text-sm rounded-md border font-medium ${paymentMethod === 'paypal' ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>PayPal</button>
                   <button type="button" onClick={() => setPaymentMethod("transferencia")} className={`px-4 py-2 text-sm rounded-md border font-medium ${paymentMethod === 'transferencia' ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>Transferencia</button>
                </div>
                {paymentMethod === 'tarjeta' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2 md:col-span-4">
                      <label htmlFor="numeroTarjeta" className="block text-sm font-medium text-gray-700">Número de tarjeta</label>
                      <input type="text" name="numeroTarjeta" id="numeroTarjeta" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" placeholder="XXXX XXXX XXXX XXXX" value={cardData.numeroTarjeta} onChange={handleCardChange} />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="vencimiento" className="block text-sm font-medium text-gray-700">Vencimiento</label>
                      <div className="flex gap-2 mt-1">
                        <select name="expMonth" id="expMonth" required className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" value={cardData.expMonth} onChange={handleCardChange}>
                          <option value="" disabled>Mes</option>
                          {Array.from({ length: 12 }, (_, i) => (<option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>{(i + 1).toString().padStart(2, '0')}</option>))}
                        </select>
                        <select name="expYear" id="expYear" required className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" value={cardData.expYear} onChange={handleCardChange}>
                          <option value="" disabled>Año</option>
                          {Array.from({ length: 13 }, (_, i) => { const year = new Date().getFullYear() + i; return <option key={year} value={year}>{year}</option>; })}
                        </select>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                      <input type="text" name="cvv" id="cvv" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" placeholder="123" value={cardData.cvv} onChange={handleCardChange} />
                    </div>
                  </div>
                )}
                 {paymentMethod === 'paypal' && (<div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-700">Serás redirigido a PayPal para completar tu compra.</div>)}
                 {paymentMethod === 'transferencia' && (<div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">Recibirás los datos para la transferencia una vez confirmado el pedido.</div>)}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 p-6 rounded-lg bg-gray-50 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Resumen</h2>
            <div className="space-y-4 mb-6 max-h-[250px] overflow-y-auto pr-2">
              {cart.length > 0 ? cart.map(item => (
                <div key={item._id} className="flex items-center gap-4">
                  <img src={`http://localhost:5000${item.imagen}`} alt={item.nombre} className="w-16 h-16 object-contain rounded-md bg-white border" />
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800">{item.nombre}</p>
                    <p className="text-sm text-gray-600">x{item.quantity}</p>
                  </div>
                  <span className="font-semibold text-gray-800">{formatPrice(item.precio * item.quantity)}</span>
                </div>
              )) : <p className="text-gray-500">Tu carrito está vacío.</p>}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Sub-total:</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Envío:</span>
                <span className="font-semibold">{deliveryMethod === 'envio' ? formatPrice(finalShippingCost) : 'Gratis'}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 mt-4 pt-2 border-t">
                <span>Total:</span>
                <span className="text-cyan-600">{formatPrice(total)}</span>
              </div>
            </div>
            <button type="submit" className="bg-cyan-500 text-white font-semibold py-3 rounded-lg hover:bg-cyan-600 transition w-full mt-6">
              PAGAR AHORA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;