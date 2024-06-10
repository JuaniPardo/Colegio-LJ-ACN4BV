import { useNavigate } from 'react-router-dom';

const SelectLoginPage = () => {
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/login/student');
  };

  const handleTeacherLogin = () => {
    navigate('/login/teacher');
  };

  return (
    <div>
      <h1>Select Login Type</h1>
      <button onClick={handleStudentLogin}>Login Alumno</button>
      <button onClick={handleTeacherLogin}>Login Profesor</button>
    </div>
  );
};

export default SelectLoginPage;
