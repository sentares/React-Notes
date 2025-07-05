import { Center, Loader, ScrollArea, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useNotes } from '../../hooks/api'
import type { Note } from '../../types'
import { NoteCard } from '../card'
import classes from './NoteList.module.css'

export const NoteList = () => {
	const { addNote, deleteNote, fetchAll, error, loading } = useNotes()
	const [notes, setNotes] = useState<Note[]>([])

	const getNotes = async () => {
		const result = await fetchAll()
		setNotes(result)
	}

	useEffect(() => {
		getNotes()
	}, [])

	// const handleAdd = async () => {
	// 	if (!newTitle.trim()) return
	// 	await addNote({ title: newTitle })
	// 	setNewTitle('')
	// 	await loadNotes()
	// }

	// const handleDelete = async (id: string) => {
	// 	await deleteNote(id)
	// 	await loadNotes()
	// }

	const handleClickNote = (item: Note) => {}

	return (
		<div className={classes.container}>
			<ScrollArea
				h='calc(100vh - 100px)'
				scrollbarSize={8}
				style={{ width: '100%' }}
			>
				{loading ? (
					<Center mt='lg'>
						<Loader />
					</Center>
				) : error ? (
					<Text c='red'>Ошибка загрузки: {error.message}</Text>
				) : (
					<div className={classes.noteList}>
						{notes.map(item => (
							<NoteCard
								key={item.id}
								note={item}
								onClick={() => handleClickNote(item)}
							/>
						))}
					</div>
				)}
			</ScrollArea>
		</div>
	)
}
