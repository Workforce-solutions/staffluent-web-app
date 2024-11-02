import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './root-reducer'
import { vbAuthApi } from './vbAuthApi'
import { authApi } from './authApi'
import { staffApi } from './staffApi'
import { clientsApi } from './clientsApi'
import { adminActivityApi } from './adminActivityApi'
import { appConfigsApi } from './appConfigsApi'
import { roleApi } from './roleApi'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      vbAuthApi.middleware,
      authApi.middleware,
      staffApi.middleware,
      clientsApi.middleware,
      adminActivityApi.middleware,
      appConfigsApi.middleware,
      roleApi.middleware
    ),
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
