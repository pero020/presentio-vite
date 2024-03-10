import { Outlet } from 'react-router-dom';
import Footer from '../Footer'

const LandingLayout = () => {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default LandingLayout