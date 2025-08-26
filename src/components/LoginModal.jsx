import Login from "../pages/Login.jsx";

const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>
        <Login onClose={onClose} />
      </div>
    </div>
  );
};

export default LoginModal;