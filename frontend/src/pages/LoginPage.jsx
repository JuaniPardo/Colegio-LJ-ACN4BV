import LoginForm from '../components/LoginForm';
import { useNavigate, useParams } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { userType } = useParams();

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
      <h1>Login {userType.charAt(0).toUpperCase() + userType.slice(1)}</h1>
      <LoginForm userType={userType} onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
