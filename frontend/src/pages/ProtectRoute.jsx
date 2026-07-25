import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
  const API = import.meta.env.VITE_API || "http://localhost:2000"
const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          `${API}/api/v1/auth/me`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setAuthorized(true);
        }
      } catch (err) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return authorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;