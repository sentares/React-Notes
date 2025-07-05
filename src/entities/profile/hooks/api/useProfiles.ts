import { apiPaths, useFirestore } from '@/shared/hooks'
import { normalizeError } from '@/shared/utils'
import { useState } from 'react'
import type { Profile } from '../../types'

export const useProfiles = () => {
	const { getAll, getOne } = useFirestore()
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

	return {
		loading,
		error,
		fetchAll,
		fetchById,
	}
}
