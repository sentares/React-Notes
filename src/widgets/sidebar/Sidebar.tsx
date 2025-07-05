import { NoteList } from '@/entities/note/ui/list'
import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import classes from './Sidebar.module.css'

export function Sidebar() {
	return (
		<nav className={classes.navbar}>
			<Button className={classes.addButton}>
				<IconPlus className={classes.icon} size={18} /> Добавить заметку
			</Button>
			<NoteList />
		</nav>
	)
}
