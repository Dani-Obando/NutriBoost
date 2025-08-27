import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { securityAPI } from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";

function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await securityAPI.get("/users/profile");
        setProfile(res.data.data.user || res.data.user || res.data);
      } catch (err) {
        console.error("Error obteniendo perfil", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Cargando perfil...</p>
      </div>
    );
  }

  if (!profile) {
    return (
       <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">No se pudo cargar el perfil.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 font-sans">
      <div className="container mx-auto max-w-xl p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 border-b border-gray-200 pb-6 mb-6">
            <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-md">
              {getInitials(profile.username)}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{profile.username}</h1>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Detalles de la Cuenta</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span className="text-gray-600">Nombre de usuario:</span>
              <span className="ml-auto font-medium text-gray-800">{profile.username}</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span className="text-gray-600">Correo electrónico:</span>
              <span className="ml-auto font-medium text-gray-800">{profile.email}</span>
            </div>
          </div>
          <div className="mt-8">
            <Link to="/orders" className="w-full block text-center bg-cyan-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-600 transition shadow">
              Mis Pedidos
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;