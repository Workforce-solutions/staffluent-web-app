import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface EmployeAvatarNameProps {
  profile_picture?: string
}

const EmployeAvatarName = ({
  profile_picture = '',
}: EmployeAvatarNameProps) => {
  return (
    <Avatar className='h-8 w-8'>
      {profile_picture.length <= 2 ? (
        <AvatarFallback>{profile_picture}</AvatarFallback>
      ) : (
        <AvatarImage src={profile_picture} alt={profile_picture} />
      )}
    </Avatar>
  )
}

export default EmployeAvatarName
