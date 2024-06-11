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

  return (
    <div>
      <p>test@example.com / password</p>
      <h1>Login</h1>
      <LoginForm onLoginSuccess={handleLoginSuccess}/>
      <button onClick={handleStudentLogin}>Login Alumno</button>
      <button onClick={handleTeacherLogin}>Login Profesor</button>
    </div>
  );
};

export default LoginPage;
