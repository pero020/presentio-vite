import { useState, useEffect, createContext } from 'react';
import './App.css';
import StudentPage from './components/StudentPage';
import RoleSwitcher from './components/RoleSwitcher';
import { Toaster } from 'sonner'
import { generateRandomId } from './lib/utils';
import PresenterPage from './components/PresenterPage.tsx';

type UserContextType = {
  clientId: string;
  clientName: string;
  currentPresentationId: string;
  setCurrentPresentationId: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType | null>(null);

function App() {
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientNameTemp, setClientNameTemp] = useState('');
  const [currentPresentationId, setCurrentPresentationId] = useState('');
  const [currentRole, setCurrentRole] = useState('student');

  useEffect(() => {
    // Check if clientId exists in local storage
    const storedClientId = localStorage.getItem('clientId');
    if (storedClientId) {
      setClientId(storedClientId);
    } else {
      // Generate random clientId if not found
      createNewClientId();
    }

    // Check if clientName exists in local storage
    const storedClientName = localStorage.getItem('clientName');
    if (storedClientName) {
      setClientName(storedClientName);
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientNameTemp(e.target.value);
  };

  const handleNameSubmit = () => {
    setClientName(clientNameTemp);
    localStorage.setItem('clientName', clientNameTemp);
    setClientNameTemp('');
  };

  const handleNewUser = () => {
    localStorage.removeItem('clientId');
    localStorage.removeItem('clientName');
    setClientId('');
    createNewClientId();
    setClientName('');
    setCurrentRole("student");
  };

  const createNewClientId = () => {
    const newClientId = generateRandomId(6);
    localStorage.setItem('clientId', newClientId);
    setClientId(newClientId);
  }

  return (
    <UserContext.Provider
      value={{
        clientId: clientId,
        clientName: clientName,
        currentPresentationId: currentPresentationId,
        setCurrentPresentationId: setCurrentPresentationId
      }}
    >
      <Toaster richColors position="bottom-center" />
      <div className="w-full flex justify-center bg-primary" >
        <div className='flex flex-col justify-between min-h-screen max-w-3xl p-4'>

          <header className="flex flex-col items-center justify-between w-full">
            {!currentPresentationId && (
              <>
                { clientName && <RoleSwitcher currentRole={currentRole} setCurrentRole={setCurrentRole} /> }
                <h1 className="text-3xl font-bold mb-4 mt-4">Welcome, {clientName.split(" ")[0] || clientNameTemp.split(" ")[0] || 'Guest'}</h1>
                { clientName && <button
                  className="py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gray-500 hover:bg-gray-600"
                  onClick={handleNewUser}
                >
                  New User
                </button>}
              </>
            )}
          </header>

          <div className="flex flex-col items-center justify-center flex-1 text-white">
            {!clientName && (
              <div className="mt-8 flex flex-col">
                <label htmlFor="clientName" className="text-xl mb-2">
                  Enter Your Name:
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={clientNameTemp}
                  onChange={handleNameChange}
                  className="w-64 p-2 rounded border border-blue-300 text-black focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleNameSubmit}
                >
                  Enter
                </button>
              </div>
            )}

            {clientName && currentRole === 'student' && <StudentPage />}
            {clientName && currentRole === "presenter" && <PresenterPage />}
          </div>

          <footer>
            <p>Presentio</p>
          </footer>

        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
