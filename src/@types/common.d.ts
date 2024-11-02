export interface UpdateApiProps<T> {
  id: number
  body: T
}

export interface HeaderProps {
  headers: Headers
  apikey?: boolean
}

export interface CommonUrlProps {
  queryString: string
  params?: string
  query?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  per_page: number
  total: number
  total_pages: number
}

export interface OpenModalProps {
  open?: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PaginatedParams {
  page: number
  size: number
  venue_short_code?: string
}

export interface EditDeleteProps<T> {
  original: T
  handleEdit?: (value: T) => void
  handleDelete?: (value: T) => void
  disableEdit?: boolean
  disableDelete?: boolean
}

export interface PaginationProps {
  size: number
  page: number
}

export type SetPagination = React.Dispatch<
  React.SetStateAction<PaginationProps>
>

export interface PaginationComponentProps {
  paginationValues: PaginationProps
  setPaginationValues: SetPagination
}

export interface FilterParams extends PaginationProps {
  loading: boolean
  hasMore: boolean
  search?: string
}

export type SetQueryParamsType = React.Dispatch<
  React.SetStateAction<FilterParams>
>

export interface FieldValueProps {
  label: ReactNode
  value: string | boolean
}

export interface OptionsType {
  value: FieldValueProps
  label?: ReactNode
  id?: string
  disabled?: boolean
}

export interface MultiselectDropdownProps {
  itemValue: OptionsType[]
  value: FieldValueProps[]
  setValue: (value: FieldValueProps[]) => void
  multiSelectorPlaceholder?: string
}
