import { UserAuthForm } from './components/user-auth-form'
import staffLogo from '/images/logo.png'

export default function Login() {
  return (
      <div className='flex flex-col justify-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
              className='mx-auto w-auto h-10'
              src={staffLogo}
              alt='Staffluent'
          />
          <h2 className='mt-6 text-center text-3xl font-semibold text-[#0A0A0A]'>
            Welcome to Staffluent
          </h2>
            <p className='mx-auto mt-2 max-w-lg text-sm text-center text-gray-600'>
                Access your workforce management platform and streamline your team operations,
                scheduling, and project tracking all in one place
            </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
            <UserAuthForm />
          </div>
        </div>
      </div>
  )
}
