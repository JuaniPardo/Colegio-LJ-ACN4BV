import { useContext, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    localStorage.setItem('userType', 'student');
    navigate('/student-dashboard');
  };

  const handleTeacherLogin = () => {
    localStorage.setItem('userType', 'teacher');
    navigate('/teacher-dashboard');
  };

  const handleLoginSuccess = (userType) => {
    // Guarda el tipo de usuario en el almacenamiento local
    localStorage.setItem('userType', userType);

    // Redirige al dashboard correspondiente
    if (userType === 'student') {
      navigate('/student-dashboard');
    } else if (userType === 'teacher') {
      navigate('/teacher-dashboard');
    }
  };

  useEffect(() => {
    const user = null;
    if (user != null) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className="flex flex-col justify-center h-screen items-center gap-4 p-4">
      <p className="text-2xl font-semibold">
        Bienvenidos <span className="text-blue-500"> Alumnos</span> y <span className="text-blue-500">Profesores</span>
      </p>
      <LoginForm onLoginSuccess={handleLoginSuccess}/>
      <div className= "flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleStudentLogin}>Login Alumno
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleTeacherLogin}>Login Profesor
        </button>
      </div>

    </div>
  );
};

export default LoginPage;
