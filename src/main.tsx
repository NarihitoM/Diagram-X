import { createRoot } from 'react-dom/client'
import {GoogleOAuthProvider} from "@react-oauth/google"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='402722029750-n25m3reg3c2g7qskcc6tc07h7d088h69.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>
)
