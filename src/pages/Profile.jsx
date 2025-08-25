import { useEffect, useState, useContext } from "react";
import { securityAPI } from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";

function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await securityAPI.get("/users/profile");
        setProfile(res.data.data.user);
      } catch (err) {
        console.error("Error obteniendo perfil", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p className="p-6 text-center">Cargando...</p>;

  return (
    <div className="py-12">
      <div className="container max-w-md">
        <h1 className="text-3xl font-bold mb-6">Perfil</h1>
        {profile && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-2">
              <strong>Nombre de usuario:</strong> {profile.username}
            </p>
            <p className="mb-2">
              <strong>Correo:</strong> {profile.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
