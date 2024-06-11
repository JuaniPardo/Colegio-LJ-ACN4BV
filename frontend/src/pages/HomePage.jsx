import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    // navigate('/register');
    alert('Registro aun no implementado')
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Registro</button>
    </div>
  );
}

export default HomePage;