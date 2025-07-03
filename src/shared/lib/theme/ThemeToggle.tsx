import { useTheme } from '@/app/providers/mantine'
import { ActionIcon } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

export const ThemeToggle = () => {
	const { colorScheme, toggleColorScheme } = useTheme()
	const isDark = colorScheme === 'dark'

	return (
		<ActionIcon
			onClick={toggleColorScheme}
			variant='default'
			size='lg'
			aria-label='Toggle theme'
		>
			{isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
		</ActionIcon>
	)
}
