import { useState, useContext } from 'react';
import { UserContext } from '../components/layouts/AppLayout.tsx';
import { Link, useNavigate } from 'react-router-dom';

function ApplicationIndexPage() {
  const [clientNameTemp, setClientNameTemp] = useState('');
  const userContext = useContext(UserContext)
  const navigate = useNavigate()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientNameTemp(e.target.value);
  };

  const handleNameSubmit = () => {
    userContext?.setClientName(clientNameTemp);
    localStorage.setItem('clientName', clientNameTemp);
    setClientNameTemp('');
    navigate("/app" + (userContext?.currentRole ? "/" + userContext?.currentRole : ""))
  };

  return (
    <>
      <div className='flex flex-col justify-between w-full max-w-3xl p-4'>
        
        {!userContext?.clientName && <h1 className="text-3xl font-semibold mb-4 mt-4">Welcome, {userContext?.clientName.split(" ")[0] || clientNameTemp.split(" ")[0] || 'Guest'}</h1>}

        <div className="flex flex-col items-center justify-center w-full flex-1">
          {!userContext?.clientName ? (
            <div className="mt-8 flex flex-col w-full max-w-sm">
              <label className="form-control w-full max-w-sm">
                <div className="label">
                  <span className="label-text">What is your name?</span>
                </div>
                <input
                type="text"
                id="clientName"
                name="clientName"
                value={clientNameTemp}
                onChange={handleNameChange}
                className="input input-bordered w-full max-w-sm"
              />
              </label>
              <button
                type="submit"
                className="btn btn-secondary mt-2"
                onClick={handleNameSubmit}
              >
                Enter
              </button>
            </div>
          ) : (
            <div className="mt-8 flex flex-col w-full max-w-sm">
              <h2 className="text-2xl font-semibold mb-4">Continue as {userContext?.clientName}?</h2>
              <Link className='w-full' to={"/app" + (userContext?.currentRole ? "/" + userContext?.currentRole : "")}>
                <button
                  type="submit"
                  className="btn btn-wide btn-secondary mt-2"
                >
                  Enter
                </button>
              </Link>
            </div>
          )
          
          }
        </div>
      </div>
    </>
  );
}

export default ApplicationIndexPage;
