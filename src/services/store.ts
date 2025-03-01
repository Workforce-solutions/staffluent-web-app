import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './root-reducer'
import { vbAuthApi } from './vbAuthApi'
import { authApi } from './authApi'
import { staffApi } from './staffApi'
import { clientsApi } from './clientsApi'
import { adminActivityApi } from './adminActivityApi'
import { appConfigsApi } from './appConfigsApi'
import { roleApi } from './roleApi'
import { dashboardApi } from './dashboardApi'
import { productivityApi } from './productivityApi'
import { attendanceApi } from './attendanceApi'
import { clientPortalApi } from './clientPortalApi'
import { servicesApi } from './servicesApi'
import { invoiceApi } from './invoiceApi'
import { tasksApi } from './tasksApi'
import { projectApi } from './projectApi'
import { scheduleApi } from './scheduleApi'
import { feedbackApi } from './feedbackApi'
import { auditLogsApi } from './auditLogsApi'
import { serviceRequestApi } from './service-requestApi'
import { clientInvoicesApi } from './clientInvoicesApi'
import { adminAnalyticsApi } from './adminAnalyticsApi'
import { clientTicketApi } from './clientTicketApi'
import { adminTicketApi } from './adminTicketApi'
import { complianceApi } from './complianceApi'
import { operationManagerApi } from './operationMangerApi'
import { teamLeaderApi } from './teamLeaderApi'
import { siteManagementApi } from './siteManagmentApi'
import { safetyApi } from './safetyApi'
import { magicLinkApi } from './magic-linkApi'
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      vbAuthApi.middleware,
      authApi.middleware,
      staffApi.middleware,
      clientsApi.middleware,
      adminActivityApi.middleware,
      dashboardApi.middleware,
      appConfigsApi.middleware,
      roleApi.middleware,
      productivityApi.middleware,
      attendanceApi.middleware,
      clientPortalApi.middleware,
      servicesApi.middleware,
      invoiceApi.middleware,
      tasksApi.middleware,
      projectApi.middleware,
      scheduleApi.middleware,
      feedbackApi.middleware,
      serviceRequestApi.middleware,
      auditLogsApi.middleware,
      clientInvoicesApi.middleware,
      adminAnalyticsApi.middleware,
      clientTicketApi.middleware,
      adminTicketApi.middleware,
      complianceApi.middleware,
      operationManagerApi.middleware,
      teamLeaderApi.middleware,
      siteManagementApi.middleware,
      safetyApi.middleware,
      magicLinkApi.middleware
    ),
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
