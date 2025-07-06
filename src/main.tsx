import { createRoot } from 'react-dom/client'
import App from './app/App'
import './app/styles/index.css'

import { registerSW } from 'virtual:pwa-register'

if ('serviceWorker' in navigator) {
	registerSW()
}
createRoot(document.getElementById('root')!).render(<App />)
