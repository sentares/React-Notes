import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './providers/context'
import { ThemeProvider } from './providers/mantine'
import { Router } from './providers/router'
import '@mantine/core/styles.css'
import './styles/index.css'

function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<RouterProvider router={Router} />
			</ThemeProvider>
		</AuthProvider>
	)
}

export default App
