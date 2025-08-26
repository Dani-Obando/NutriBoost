// src/components/RegisterModal.jsx
import Register from "../pages/Register.jsx";

const RegisterModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full">
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>
        <Register isModal={true} onClose={onClose} />
      </div>
    </div>
  );
};

export default RegisterModal;