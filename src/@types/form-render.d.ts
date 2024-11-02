import { ControllerRenderProps } from 'react-hook-form'
import { FilterParams, OptionsType, SetQueryParamsType } from './common'

interface FunctionFieldProps {
  lastOptionRef?: (node: Element | null) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  onSelectChange?: (value: string | boolean) => void
}

export interface FormFieldItems<T> extends FunctionFieldProps {
  name?: T
  options?: OptionsType[]
  selected?: OptionsType[]
  setSelected?: React.Dispatch<React.SetStateAction<OptionsType[]>>
  label?: string
  placeholder?: string
  className?: string
  selectValue?: string
  isDefaultValue?: boolean
  disabled?: boolean
  setFilters?: SetFiltersType<unknown>
  setQueryParams?: SetQueryParamsType
  queryParams?: FilterParams
}

export interface FieldProps
  extends FormFieldItems<T>,
    Partial<ControllerRenderProps<unknown, T>> {}
