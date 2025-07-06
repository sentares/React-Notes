import { useNotesContext } from '@/app/providers/context'
import { useNotes } from '@/entities/note/hooks/api'
import { NoteDetail } from '@/entities/note/ui/detail'
import { NoteEditor } from '@/features/editor/ui'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { Button, Group, Modal } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './NotePage.module.css'

const NotePage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { activeNote, setActiveNote, setNoteslist } = useNotesContext()
	const { fetchById, deleteNote, updateNote, loading } = useNotes()

	const [editMode, setEditMode] = useState(false)
	const [content, setContent] = useState('')
	const [deleteModalOpened, setDeleteModalOpened] = useState(false)

	const getNote = async () => {
		if (!id) return
		if (activeNote?.id !== id) {
			const note = await fetchById(id)
			setActiveNote(note)
			setContent(note.title)
		} else {
			setContent(activeNote.title)
		}
	}

	useDebounce(
		async () => {
			if (!editMode || !activeNote) return

			await updateNote(activeNote.id, { title: content })
			const updatedNote = { ...activeNote, title: content }
			setActiveNote(updatedNote)
			setNoteslist(prev =>
				prev.map(note => (note.id === updatedNote.id ? updatedNote : note))
			)
		},
		1000,
		[content, editMode, activeNote]
	)

	const handleDeleteConfirm = async () => {
		if (!activeNote) return
		await deleteNote(activeNote.id)
		setActiveNote(null)
		setNoteslist(prev => prev.filter(note => note.id !== activeNote.id))
		setDeleteModalOpened(false)
		navigate('/')
	}

	useEffect(() => {
		getNote()
	}, [id])
	return (
		<div className={classes.notePage}>
			{editMode ? (
				<NoteEditor
					initialValue={content}
					onSave={() => setEditMode(false)}
					onCancel={() => {
						setContent(activeNote?.title ?? '')
						setEditMode(false)
					}}
					onChange={setContent}
				/>
			) : (
				<>
					<NoteDetail
						markdownText={content}
						onEdit={() => setEditMode(true)}
						onDelete={() => setDeleteModalOpened(true)}
					/>

					<Modal
						opened={deleteModalOpened}
						onClose={() => setDeleteModalOpened(false)}
						title='Подтвердите удаление'
						centered
					>
						<Group justify='flex-end'>
							<Button
								variant='default'
								onClick={() => setDeleteModalOpened(false)}
							>
								Отмена
							</Button>
							<Button
								color='red'
								onClick={handleDeleteConfirm}
								loading={loading}
							>
								Удалить
							</Button>
						</Group>
					</Modal>
				</>
			)}
		</div>
	)
}

export default NotePage
