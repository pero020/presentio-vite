import './App.css';
import { Route, Routes } from 'react-router-dom';
import ApplicationIndexPage from './pages/ApplicationIndexPage.tsx';
import LandingPage from './pages/LandingPage.tsx';
import LandingLayout from './components/layouts/LandingLayout.tsx';
import AppLayout from './components/layouts/AppLayout.tsx';
import StudentPage from './pages/StudentPage.tsx';
import PresenterPage from './pages/PresenterPage.tsx';

function App() {
  return (
    <main className='flex flex-col min-h-screen'>
      <Routes>
        <Route path='/' element={<LandingLayout />}>
          <Route index element={<LandingPage />}/>
        </Route>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<ApplicationIndexPage />} />
          <Route path="student" element={<StudentPage />} />
          <Route path="presenter" element={<PresenterPage />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
