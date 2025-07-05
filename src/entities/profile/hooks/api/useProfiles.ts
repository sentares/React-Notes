import { apiPaths, useFirestore } from '@/shared/hooks'
import { normalizeError } from '@/shared/utils'
import { useState } from 'react'
import type { Profile } from '../../types'

export const useProfiles = () => {
	const { getAll, getOne, add, remove } = useFirestore()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const fetchAll = async (): Promise<Profile[]> => {
		setLoading(true)
		setError(null)

		try {
			const response = await getAll<Profile>(apiPaths.profiles)
			return response
		} catch (error) {
			setError(normalizeError(error, 'Не удалось загрузить профили'))
			return []
		} finally {
			setLoading(false)
		}
	}

	const fetchById = async (id: string): Promise<Profile> => {
		setLoading(true)
		setError(null)

		try {
			const response = await getOne<Profile>(apiPaths.profiles, id)
			return response
		} catch (error) {
			const normalized = normalizeError(error, 'Не удалось загрузить профиль')
			setError(normalized)
			throw normalized
		} finally {
			setLoading(false)
		}
	}

	const addProfile = async (
		data: Omit<Profile, 'id'>
	): Promise<string | undefined> => {
		setLoading(true)
		setError(null)

		try {
			const newId = await add(apiPaths.profiles, data)
			return newId
		} catch (error) {
			const normalized = normalizeError(error, 'Не удалось добавить профиль')
			setError(normalized)
		} finally {
			setLoading(false)
		}
	}

	const deleteProfile = async (id: string): Promise<void> => {
		setLoading(true)
		setError(null)

		try {
			await remove(apiPaths.profiles, id)
		} catch (error) {
			const normalized = normalizeError(error, 'Не удалось удалить профиль')
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
		addProfile,
		deleteProfile,
	}
}
