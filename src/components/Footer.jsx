function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">NutriBoost</h3>
            <p className="text-gray-300">
              Tu tienda de confianza para suplementos nutricionales de calidad.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-gray-200 transition">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-200 transition">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-200 transition">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-gray-300">soporte@nutriboost.com</p>
            <p className="text-gray-300">+123-456-7890</p>
          </div>
        </div>
        <p className="mt-8 text-center text-gray-400">
          © {new Date().getFullYear()} NutriBoost. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
