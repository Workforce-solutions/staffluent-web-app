import { FilterParams, SetQueryParamsType } from '@/@types/common'
import { FieldProps } from '@/@types/form-render'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useIntersectionObserver from '@/hooks/use-intersection-observor'
import { CheckIcon } from 'lucide-react'

const SelectWrapper = ({
  options = [],
  onChange,
  onSelectChange,
  value,
  placeholder,
  queryParams,
  setQueryParams,
  selectValue,
  disabled,
  isDefaultValue = true,
  className = '',
  ...field
}: FieldProps) => {
  const lastEntryRef = useIntersectionObserver(
    queryParams as FilterParams,
    setQueryParams as SetQueryParamsType
  )

  const onValueChange = (value: string) => {
    onChange?.(value)
    onSelectChange?.(value)
  }

  const listItems = options.map((item, index) => {
    const isSelected =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value?.value === item.value.value || value === item.value.value

    return (
      <div
        key={index}
        className='relative mx-2 flex !w-full cursor-pointer items-center justify-between gap-1'
      >
        {isSelected && (
          <span className='absolute left-2 z-50 text-secondary group-hover:text-white'>
            <CheckIcon className='font-semibold opacity-100' size={18} />
          </span>
        )}

        <SelectItem
          key={String(index)}
          value={item.value.value as string}
          className='hover:bg-secondary hover:text-white'
          ref={index === options.length - 1 ? lastEntryRef?.lastEntryRef : null}
        >
          {item.label}
        </SelectItem>
      </div>
    )
  })

  return (
    <Select
      {...field}
      onValueChange={onValueChange}
      disabled={disabled}
      value={isDefaultValue && selectValue ? selectValue : value}
      defaultValue={selectValue ?? value}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className={`!w-full ${className}`}>
        <SelectGroup>{listItems}</SelectGroup>
        {queryParams?.loading && (
          <div className='p-2 text-center'>Loading more...</div>
        )}
      </SelectContent>
    </Select>
  )
}

export default SelectWrapper
