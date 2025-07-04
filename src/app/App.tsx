import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './providers/mantine'
import { Router } from './providers/router'
import '@mantine/core/styles.css'
import './styles/index.css'

function App() {
	return (
		<ThemeProvider>
			<RouterProvider router={Router} />
		</ThemeProvider>
	)
}

export default App
