import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';

const LoginForm = () => {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simular un login exitoso
    login();
  };

  return (
    <form className= "flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
      <div>
        <label className= "block text-sm font-medium text-gray-700"
        >Email:</label>
        <input className= "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className= "block text-sm font-medium text-gray-700"
        >Password:</label>
        <input className= "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <div>{error}</div>}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit">Login
      </button>
    </form>
  );
};

export default LoginForm;
