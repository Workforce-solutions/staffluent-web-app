import { CommonUrlProps } from '@/@types/common'
import { vbParams } from './common-functions'

export const getCommonUrl = ({
  queryString = '',
  params = vbParams,
  query = '',
}: CommonUrlProps) => {
  return queryString + params + query
}
