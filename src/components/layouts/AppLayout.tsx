import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import { UserContextType } from '../../types/types.ts';
import { createContext, useEffect, useState } from 'react';
import { generateRandomId } from '../../lib/utils.tsx';
import { Toaster } from 'sonner';
import AppHeader from '../AppHeader.tsx';

export const UserContext = createContext<UserContextType | null>(null);

const AppLayout = () => {
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [currentPresentationId, setCurrentPresentationId] = useState('');
  const [currentRole, setCurrentRole] = useState('student');

  useEffect(() => {
    const storedClientId = localStorage.getItem('clientId');
    if (storedClientId) {
      setClientId(storedClientId);
    } else {
      createNewClientId();
    }

    const storedClientName = localStorage.getItem('clientName');
    if (storedClientName) {
      setClientName(storedClientName);
    }
  }, []);

  const createNewClientId = () => {
    const newClientId = generateRandomId(6);
    localStorage.setItem('clientId', newClientId);
    setClientId(newClientId);
  }

  return (
    <UserContext.Provider
      value={{
        clientId: clientId,
        setClientId: setClientId,
        createNewClientId: createNewClientId,
        clientName: clientName,
        setClientName: setClientName,
        currentPresentationId: currentPresentationId,
        setCurrentPresentationId: setCurrentPresentationId,
        currentRole: currentRole,
        setCurrentRole: setCurrentRole
      }}
    >
      <Toaster richColors position="bottom-center" />
      <div className='min-h-screen flex flex-col'>
        <AppHeader />
        <div className="flex flex-col flex-1 justify-center items-center">
          <Outlet />
        </div>
      </div>
      <Footer />
    </UserContext.Provider>
  )
}
export default AppLayout