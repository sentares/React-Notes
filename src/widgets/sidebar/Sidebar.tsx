import { NoteList } from '@/entities/note/ui/list'
import classes from './Sidebar.module.css'

export function Sidebar() {
	return (
		<nav className={classes.navbar}>
			<NoteList />
		</nav>
	)
}
