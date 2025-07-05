import { useAuth } from '@/app/providers/context'
import { Search } from '@/features/search/ui'
import { getDynamicComponent } from '@/shared/components/dynamic'
import { ActionIcon, Burger, Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLogout } from '@tabler/icons-react'
import classes from './Header.module.css'

const ThemeToggle = getDynamicComponent('ThemeToggle')

export const Header = () => {
	const [opened, { toggle }] = useDisclosure(false)

	const { logout } = useAuth()

	const handleClickLeaveOut = () => {
		logout()
	}

	return (
		<header className={classes.header}>
			<Container size='xl' className={classes.inner}>
				<h1>Мои заметки</h1>

				<Burger opened={opened} onClick={toggle} hiddenFrom='xs' size='sm' />

				<div className={classes.rightSection}>
					<Search />

					<ThemeToggle />

					<ActionIcon
						variant='light'
						color='red'
						size='lg'
						aria-label='Logout'
						onClick={handleClickLeaveOut}
					>
						<IconLogout className={classes.linkIcon} stroke={1.5} size={18} />
					</ActionIcon>
				</div>
			</Container>
		</header>
	)
}
