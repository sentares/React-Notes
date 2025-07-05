import { useNotes } from '@/entities/note/hooks/api'
import type { Note } from '@/entities/note/types'
import { useDebounce } from '@/shared/hooks'
import {
	createContext,
	useContext,
	useRef,
	useState,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from 'react'

interface NotesContextType {
	activeNote: Note | null
	notesList: Note[]
	loading: boolean
	error: Error | null
	searchQuery: string
	setActiveNote: (note: Note | null) => void
	setNoteslist: Dispatch<SetStateAction<Note[]>>
	refreshNoteslist: () => Promise<void>
	createNote: () => Promise<Note>
	setSearchQuery: (value: string) => void
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export const NoteProvider = ({ children }: { children: ReactNode }) => {
	const originalNotesRef = useRef<Note[]>([])

	const { fetchAll, addNote, loading, error } = useNotes()

	const [searchQuery, setSearchQuery] = useState('')
	const [activeNote, setActiveNote] = useState<Note | null>(null)
	const [notesList, setNoteslist] = useState<Note[]>([])

	const refreshNoteslist = async () => {
		const data = await fetchAll()
		originalNotesRef.current = data
		setNoteslist(data)
	}

	const createNote = async () => {
		const newNoteData = { title: 'Новая заметка' }
		const newNote = await addNote(newNoteData)
		if (!newNote) throw new Error('Ошибка создания заметки')

		originalNotesRef.current = [newNote, ...originalNotesRef.current]
		setNoteslist(prev => [newNote, ...prev])
		setActiveNote(newNote)
		return newNote
	}

	useDebounce(
		async () => {
			const query = searchQuery.toLowerCase().trim()

			if (!query) {
				await refreshNoteslist()
				setActiveNote(originalNotesRef.current[0] ?? null)
				return
			}

			const filtered = originalNotesRef.current.filter(note =>
				note.title.toLowerCase().includes(query)
			)

			setNoteslist(filtered)
			setActiveNote(filtered[0] ?? null)
		},
		500,
		[searchQuery]
	)

	return (
		<NotesContext.Provider
			value={{
				activeNote,
				notesList,
				error,
				loading,
				searchQuery,
				setSearchQuery,
				setActiveNote,
				refreshNoteslist,
				setNoteslist,
				createNote,
			}}
		>
			{children}
		</NotesContext.Provider>
	)
}

export const useNotesContext = () => {
	const context = useContext(NotesContext)
	if (!context) {
		throw new Error('useNotesContext must be used within a NoteProvider')
	}
	return context
}
