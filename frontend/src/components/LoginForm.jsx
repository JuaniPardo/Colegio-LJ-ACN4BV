import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LoginForm = () => {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastId = toast();
    // Simular un login exitoso de admin
    toast.loading("Iniciando sesión...", {
      id: toastId
    })

    const [loginResult, loginMessage] = await login(username, password);
    
    if(loginResult) {
      toast.success('Inicio de sesión exitoso.', {
        id: toastId,
        duration: 1000
      });
      navigate('/dashboard')
      return
    } else {
      toast.error(loginMessage, {
        id: toastId,
        duration: 2000
      });
    }
  };

  return (
    <form className= "flex flex-col gap-4 p-4 w-full md:w-1/5" onSubmit={handleSubmit}>
      <div>
        <label className= "block text-sm font-medium text-gray-700"
        >Nombre de usuario:</label>
        <input className= "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label className= "block text-sm font-medium text-gray-700"
        >Contraseña:</label>
        <input className= "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit">Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
