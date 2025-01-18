import { Routes, Route } from 'react-router-dom'
import { EmailVerify, Home, Login, ResetPassword } from './pages'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
      {/* <h1 className='text-center mt-5 font-bold text-lg text-purple-700'>Hello World, This is a MernAuth app for boilerplate backend auth.</h1> */}
    </div>
  )
}

export default App