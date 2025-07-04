import { apiPaths, useFirestore } from '@/shared/hooks'
import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useEffect } from 'react'
import classes from './Sidebar.module.css'

export function Sidebar() {
	const { getAll, add, update, remove } = useFirestore()

	const fetchNotes = async () => {
		const response = await getAll(apiPaths.notes)
		console.log(response)
	}

	const addNote = async () => {
		const response = await add(apiPaths.notes, { title: 'test note' })
		console.log(response, 'response')
	}

	useEffect(() => {
		fetchNotes()
	}, [])

	return (
		<nav className={classes.navbar}>
			<Button onClick={addNote} className={classes.addButton}>
				<IconPlus className={classes.icon} size={18} /> Добавить заметку
			</Button>
			<div className={classes.navbarMain}></div>
		</nav>
	)
}
