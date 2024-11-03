import { OptionsType } from '@/@types/common'
import SelectWrapper from '../wrappers/select-wrapper'

type TimeFrameType = 'weekly' | 'monthly' | 'quarterly' | 'yearly'

interface SelectTimeFrameProps {
  timeFrame: TimeFrameType
  setTimeFrame: (value: TimeFrameType) => void
}

const SelectTimeFrame = ({ timeFrame, setTimeFrame }: SelectTimeFrameProps) => {
  // Define options
  const options: OptionsType[] = [
    { value: { label: 'Weekly', value: 'weekly' }, label: 'Weekly' },
    { value: { label: 'Monthly', value: 'monthly' }, label: 'Monthly' },
    { value: { label: 'Quarterly', value: 'quarterly' }, label: 'Quarterly' },
    { value: { label: 'Yearly', value: 'yearly' }, label: 'Yearly' },
  ]

  return (
    <SelectWrapper
      options={options}
      onChange={setTimeFrame}
      value={timeFrame}
      placeholder='Select time frame'
      selectValue={timeFrame}
      className='w-full sm:w-[180px]'
    />
  )
}

export default SelectTimeFrame
