import { useAuth } from '@/app/providers/context'
import { useProfiles } from '@/entities/profile/hooks/api'
import type { Profile } from '@/entities/profile/types'
import { ProfileCard } from '@/entities/profile/ui'
import { useRedirectFrom } from '@/shared/hooks'
import { generateToken } from '@/shared/utils'
import { Card, Center, Group, Loader, SimpleGrid, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './AuthPage.module.css'

const AuthPage = () => {
	const navigate = useNavigate()
	const from = useRedirectFrom()

	const { login } = useAuth()
	const { fetchAll, loading, error } = useProfiles()

	const [profiles, setProfiles] = useState<Profile[]>([])

	const getAllProfiles = async () => {
		const response = await fetchAll()
		setProfiles(response)
	}

	useEffect(() => {
		getAllProfiles()
	}, [])

	const handleClickProfile = (profile: Profile) => {
		const token = generateToken(profile.email)
		login(token)
		navigate(from, { replace: true })
	}

	return (
		<div className={classes.page}>
			<Card withBorder radius='md' className={classes.card}>
				<Group justify='space-between'>
					<Text className={classes.title}>Выберите профиль</Text>
				</Group>
				{loading ? (
					<Center h={200}>
						<Loader />
					</Center>
				) : (
					<>
						{error && (
							<Text c='red' size='sm' mt='md'>
								Ошибка загрузки профилей: {error.message}
							</Text>
						)}

						{profiles.length === 0 ? (
							<Text ta='center' mt='md'>
								Профили не найдены.
							</Text>
						) : (
							<SimpleGrid cols={3} mt='md'>
								{profiles.map(profile => (
									<ProfileCard
										key={profile.id}
										profile={profile}
										onClick={() => handleClickProfile(profile)}
									/>
								))}
							</SimpleGrid>
						)}
					</>
				)}
			</Card>
		</div>
	)
}

export default AuthPage
