import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


async function enableMocking() {
  if (process.env.NODE_ENV === 'production') {
    return
  }
 
  const { worker } = await import('./mocks/browser.ts')
 
  return worker.start()
}
 
await enableMocking();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
