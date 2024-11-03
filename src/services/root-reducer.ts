import { combineReducers } from '@reduxjs/toolkit'
import { vbAuthApi } from './vbAuthApi'
import { staffApi } from './staffApi'
import { authApi } from './authApi'
import { clientsApi } from './clientsApi'
import { adminActivityApi } from './adminActivityApi'
import { dashboardApi } from './dashboardApi'
import { appConfigsApi } from './appConfigsApi'
import { roleApi } from './roleApi'
import { productivityApi } from './productivityApi'
import { attendanceApi } from './attendanceApi'

const rootReducer = combineReducers({
  [vbAuthApi.reducerPath]: vbAuthApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
  [adminActivityApi.reducerPath]: adminActivityApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [appConfigsApi.reducerPath]: appConfigsApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [productivityApi.reducerPath]: productivityApi.reducer,
  [attendanceApi.reducerPath]: attendanceApi.reducer,
})

export default rootReducer
