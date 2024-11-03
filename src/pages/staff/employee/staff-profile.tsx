import { OpenModalProps } from '@/@types/common'
import { EmployeeResponse } from '@/@types/staff'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  getPerformanceColor,
  getStatusColor,
} from '@/hooks/common/common-functions'

interface StaffProfileProps extends OpenModalProps {
  staff?: EmployeeResponse
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StaffProfile = ({ staff, open, setOpen }: StaffProfileProps) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Staff Profile</DialogTitle>
      </DialogHeader>
      {staff && (
        <div className='space-y-4'>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-20 w-20'>
              <AvatarImage
                src={`https://api.dicebear.com/5.x/initials/svg?seed=${staff.name}`}
              />
              <AvatarFallback>
                {staff.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className='text-2xl font-bold'>{staff.name}</h2>
              <p className='text-gray-500'>{staff.role.name}</p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-sm font-medium text-gray-500'>Department</p>
              <p>{staff.department?.name}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-500'>Status</p>
              <Badge className={getStatusColor(staff.status)}>
                {staff.status}
              </Badge>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-500'>Email</p>
              <p>{staff.email}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-500'>Phone</p>
              <p>{staff?.phone}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-500'>Start Date</p>
              <p>{new Date(staff.start_date ?? '').toLocaleDateString()}</p>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-500'>Performance</p>
              <p className={getPerformanceColor(staff.performance)}>
                {staff.performance}%
              </p>
            </div>
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
)
