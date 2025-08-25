import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="py-12 bg-accent">
      <div className="container">
        <div className="bg-primary text-white p-12 rounded-xl shadow-xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Bienvenido a NutriBoost
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Tu tienda de confianza para productos de nutrición y salud. Descubre
            nuestra amplia gama de proteínas y suplementos.
          </p>
          <Link
            to="/products"
            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-green-600 transition text-lg"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
