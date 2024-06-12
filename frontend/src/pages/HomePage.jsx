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
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className={'text-4xl font-bold text-center text-blue-500'}>Colegio LJ</h1>
      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogin}>Login
        </button>
        <button className="border-blue-500 text-blue-500 border-2 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded"
                onClick={handleRegister}>Registro
        </button>
      </div>

    </div>
  );
}

export default HomePage;