import { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    if(accessToken != null) {
      navigate("/dashboard");
    }
  }, [accessToken]);

  return (
    <div className="flex flex-col justify-center h-screen items-center gap-4 p-4">
    <p className="text-2xl font-semibold">
      Bienvenidos <span className="text-blue-500"> Alumnos</span> y <span className="text-blue-500">Profesores</span>
    </p>
    <LoginForm />
  </div>
  )
}