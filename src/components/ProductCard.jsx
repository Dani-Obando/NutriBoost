// src/components/ProductCard.jsx
import React from 'react';

function ProductCard({ name, price, imageUrl }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <img src={imageUrl} alt={name} className="w-full h-40 object-contain mb-4" />
      <h3 className="text-base font-semibold text-gray-800 text-center mb-2">{name}</h3>
      <p className="text-xl font-bold text-blue-600 text-center">₡{price}</p>
    </div>
  );
}

export default ProductCard;