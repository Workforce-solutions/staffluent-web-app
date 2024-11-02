import { combineReducers } from '@reduxjs/toolkit'
import { vbAuthApi } from './vbAuthApi'
import { staffApi } from './staffApi'
import { authApi } from './authApi'
import { clientsApi } from './clientsApi'
import { adminActivityApi } from './adminActivityApi'
import { appConfigsApi } from './appConfigsApi'
import { roleApi } from './roleApi'

const rootReducer = combineReducers({
  [vbAuthApi.reducerPath]: vbAuthApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
  [adminActivityApi.reducerPath]: adminActivityApi.reducer,
  [appConfigsApi.reducerPath]: appConfigsApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
})

export default rootReducer
