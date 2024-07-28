import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons' 
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Simular un login exitoso de admin
    const [loginResult, loginMessage] = await login(username, password);
    console.log(loginResult, loginMessage)
    if(loginResult) {
      console.log("logged in")
      navigate('/dashboard')
      return
    } else {
      setError(loginMessage)
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
      {error && (
        <div className='flex flex-row justify-center items-center'>
          <FontAwesomeIcon icon={faCircleXmark} className="text-red-700 text-sm mr-2" />
          <p className='text-red-700 text-sm'>{error}</p>
        </div>
      )}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit">Login
      </button>
    </form>
  );
};

export default LoginForm;
