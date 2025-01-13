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
import { clientPortalApi } from './clientPortalApi'
import { servicesApi } from './servicesApi'
import { invoiceApi } from './invoiceApi'
import { tasksApi } from './tasksApi'
import { projectApi } from './projectApi'
import { scheduleApi } from './scheduleApi'
import { feedbackApi } from './feedbackApi'
import { auditLogsApi } from './auditLogsApi'
import { clientInvoicesApi } from './clientInvoicesApi'
import { serviceRequestApi } from './service-requestApi'
import { adminAnalyticsApi } from './adminAnalyticsApi'
import { clientTicketApi } from './clientTicketApi'
import { adminTicketApi } from './adminTicketApi'
import { complianceApi } from './complianceApi'
import { operationManagerApi } from './operationMangerApi'
import { teamLeaderApi } from './teamLeaderApi'
import { siteManagementApi } from './siteManagmentApi'
import { safetyApi } from './safetyApi'
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
  [clientPortalApi.reducerPath]: clientPortalApi.reducer,
  [servicesApi.reducerPath]: servicesApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [scheduleApi.reducerPath]: scheduleApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  [serviceRequestApi.reducerPath]: serviceRequestApi.reducer,
  [auditLogsApi.reducerPath]: auditLogsApi.reducer,
  [clientInvoicesApi.reducerPath]: clientInvoicesApi.reducer,
  [adminAnalyticsApi.reducerPath]: adminAnalyticsApi.reducer,
  [clientTicketApi.reducerPath]: clientTicketApi.reducer,
  [adminTicketApi.reducerPath]: adminTicketApi.reducer,
  [complianceApi.reducerPath]: complianceApi.reducer,
  [operationManagerApi.reducerPath]: operationManagerApi.reducer,
  [teamLeaderApi.reducerPath]: teamLeaderApi.reducer,
  [siteManagementApi.reducerPath]: siteManagementApi.reducer,
  [safetyApi.reducerPath]: safetyApi.reducer,
})

export default rootReducer
