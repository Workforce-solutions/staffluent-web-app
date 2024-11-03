// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { SessionProvider } from './contexts/SessionContext'
import router from '@/router'
import '@/index.css'
import { Provider } from 'react-redux'
import store from './services/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  </React.StrictMode>
)
