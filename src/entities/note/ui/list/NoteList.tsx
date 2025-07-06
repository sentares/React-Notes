import { useNotesContext } from '@/app/providers/context'
import { internalPaths } from '@/app/providers/router'
import { Button, Center, Loader, ScrollArea, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NoteCard } from '../card'
import classes from './NoteList.module.css'

export const NoteList = () => {
	const navigate = useNavigate()

	const { notesList, error, loading, refreshNoteslist, createNote } =
		useNotesContext()

	const getNotes = async () => {
		await refreshNoteslist()
	}

	const handleCreateNote = async () => {
		const newNote = await createNote()
		if (newNote) {
			navigate(internalPaths.note.detail(newNote.id))
		}
	}

	useEffect(() => {
		getNotes()
	}, [])

	return (
		<div className={classes.container}>
			<Button mb='md' w='100%' onClick={handleCreateNote}>
				<IconPlus size={18} />
				Новая заметка
			</Button>

			<ScrollArea
				h='calc(100vh - 160px)'
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
						{notesList.map(item => (
							<NoteCard key={item.id} note={item} />
						))}
					</div>
				)}
			</ScrollArea>
		</div>
	)
}
