import { apiPaths, useFirestore } from '@/shared/hooks'
import { normalizeError } from '@/shared/utils'
import { useState } from 'react'
import type { Note } from '../../types'

export const useNotes = () => {
	const { getAll, getOne, add, remove } = useFirestore()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const fetchAll = async (): Promise<Note[]> => {
		setLoading(true)
		setError(null)

		try {
			const response = await getAll<Note>(apiPaths.notes)
			return response
		} catch (error) {
			setError(normalizeError(error, 'Не удалось загрузить профили'))
			return []
		} finally {
			setLoading(false)
		}
	}

	const fetchById = async (id: string): Promise<Note> => {
		setLoading(true)
		setError(null)

		try {
			const response = await getOne<Note>(apiPaths.notes, id)
			return response
		} catch (error) {
			const normalized = normalizeError(error, 'Не удалось загрузить заметку')
			setError(normalized)
			throw normalized
		} finally {
			setLoading(false)
		}
	}

	const addNote = async (
		data: Omit<Note, 'id'>
	): Promise<string | undefined> => {
		setLoading(true)
		setError(null)

		try {
			const newId = await add(apiPaths.notes, data)
			return newId
		} catch (error) {
			const normalized = normalizeError(error, 'Не удалось добавить заметку')
			setError(normalized)
		} finally {
			setLoading(false)
		}
	}

	const deleteNote = async (id: string): Promise<void> => {
		setLoading(true)
		setError(null)

		try {
			await remove(apiPaths.notes, id)
		} catch (error) {
			const normalized = normalizeError(error, 'Не удалось удалить заметку')
			setError(normalized)
		} finally {
			setLoading(false)
		}
	}

	return {
		loading,
		error,
		fetchAll,
		fetchById,
		addNote,
		deleteNote,
	}
}
