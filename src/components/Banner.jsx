// src/components/Banner.jsx
function Banner() {
  return (
    <div className="relative w-full h-80 overflow-hidden">
      {/* Background with two colors, similar to the image */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500"></div>

      {/* Image of the product */}
      <div className="absolute inset-0 z-10 flex items-center justify-between p-8">
        <div className="flex-1">
          <img 
            src="/images/c4-banner.png" // Asegúrate de tener esta imagen en tu carpeta public/images
            alt="C4 Original" 
            className="max-h-full h-64 mx-auto"
          />
        </div>
        
        {/* Text and list of benefits */}
        <div className="flex-1 text-gray-800 p-4">
          <ul className="list-none space-y-2 text-lg font-semibold">
            <li className="flex items-center">Aumento de energía</li>
            <li className="flex items-center">Mejora del rendimiento físico</li>
            <li className="flex items-center">Bombeo Muscular</li>
            <li className="flex items-center">Ayuda a la recuperación muscular</li>
          </ul>
        </div>
        
        {/* Logo/Icon in the corner */}
        <div className="absolute bottom-4 right-4 text-white text-4xl font-bold">
          sa
        </div>
      </div>
    </div>
  );
}

export default Banner;