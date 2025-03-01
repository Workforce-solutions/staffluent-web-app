import { ForgotForm } from './components/forgot-form'
import staffLogo from '/images/logo.png'

export default function ForgotPassword() {
  return (
      <div className='flex flex-col justify-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
              className='mx-auto w-auto h-10'
              src={staffLogo}
              alt='Staffluent'
          />
           <h2 className='mt-6 text-center text-3xl font-semibold text-[#0A0A0A]'>
            Login with magic link
          </h2>
          <p className='mx-auto mt-2 max-w-lg text-sm text-center text-gray-600'>
            Enter your email address and we'll send you a magic link to log in directly. You can change your password from the dashboard later.
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
            <ForgotForm />
          </div>
        </div>
      </div>
  )
}