import { mantineTheme } from '@/shared/lib/theme/ThemeConfig'
import {
	ColorSchemeScript,
	MantineProvider,
	type MantineColorScheme,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { createContext, useContext, useMemo } from 'react'

type ThemeContextType = {
	colorScheme: MantineColorScheme
	toggleColorScheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) throw new Error('useTheme must be used within ThemeProvider')
	return context
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [colorScheme, setColorScheme] = useLocalStorage<MantineColorScheme>({
		key: 'color-scheme',
		defaultValue: 'light',
	})

	const toggleColorScheme = () => {
		setColorScheme(prev => (prev === 'dark' ? 'light' : 'dark'))
	}

	const contextValue = useMemo(
		() => ({ colorScheme, toggleColorScheme }),
		[colorScheme]
	)

	const effectiveColorScheme = colorScheme === 'auto' ? 'light' : colorScheme

	return (
		<>
			<ColorSchemeScript forceColorScheme={effectiveColorScheme} />
			<ThemeContext.Provider value={contextValue}>
				<MantineProvider
					theme={mantineTheme}
					forceColorScheme={effectiveColorScheme}
				>
					{children}
				</MantineProvider>
			</ThemeContext.Provider>
		</>
	)
}
