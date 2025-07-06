import { RouterProvider } from 'react-router-dom'
import { AuthProvider, NoteProvider } from './providers/context'
import { ThemeProvider } from './providers/mantine'
import { Router } from './providers/router'
import '@mantine/core/styles.css'

function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<NoteProvider>
					<RouterProvider router={Router} />
				</NoteProvider>
			</ThemeProvider>
		</AuthProvider>
	)
}

export default App
