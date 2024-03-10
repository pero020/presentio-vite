import { useContext } from 'react'
import { UserContext } from './layouts/AppLayout';
import { useNavigate } from 'react-router-dom';

const NewUserButton = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate()

  const handleNewUser = () => {
    localStorage.removeItem('clientId');
    localStorage.removeItem('clientName');
    userContext?.setClientId('');
    userContext?.createNewClientId();
    userContext?.setClientName('');
    userContext?.setCurrentRole("student");
    navigate("/app")
  };


  return (
    <button
      className="btn btn-alt btn-sm"
      onClick={handleNewUser}
    >
      New User
    </button>
  )
}

export default NewUserButton