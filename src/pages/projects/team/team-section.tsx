/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'

export const TeamSection = ({
  title,
  description,
  data,
  isLoading,
  isError,
  columns,
}: Record<string, any>) => (
  <div className='space-y-4'>
    <div>
      <h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
      <p className='text-muted-foreground'>{description}</p>
    </div>
    <GenericTableWrapper
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
    />
  </div>
)
