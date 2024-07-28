import LoginForm from '../components/LoginForm';

export const LoginPage = () => {

  return (
    <div className="flex flex-col justify-center h-screen items-center gap-4 p-4">
    <p className="text-2xl font-semibold">
      Bienvenidos <span className="text-blue-500"> Alumnos</span> y <span className="text-blue-500">Profesores</span>
    </p>
    <LoginForm  />
  </div>
  )
}