import { ForgotForm } from './components/forgot-form'
import staffLogo from '/images/logo.png'

export default function ForgotPassword() {
  return (
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
              className='mx-auto h-10 w-auto'
              src={staffLogo}
              alt='Staffluent'
          />
          <h2 className='mt-6 text-center text-3xl font-semibold text-gray-900'>
            Reset your password
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600 max-w-lg mx-auto'>
            Enter your email address and we'll send you instructions to reset your password
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <ForgotForm />
          </div>
        </div>
      </div>
  )
}