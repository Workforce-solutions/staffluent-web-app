import { UserAuthForm } from './components/user-auth-form'
import staffLogo from '/images/logo.png'

export default function Login() {
  return (
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img
              className='mx-auto h-10 w-auto'
              src={staffLogo}
              alt='Staffluent'
          />
          <h2 className='mt-6 text-center text-3xl font-semibold text-gray-900'>
            Welcome to Staffluent
          </h2>
            <p className='mt-2 text-center text-sm text-gray-600 max-w-lg mx-auto'>
                Access your workforce management platform and streamline your team operations,
                scheduling, and project tracking all in one place
            </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <UserAuthForm />
          </div>
        </div>
      </div>
  )
}
