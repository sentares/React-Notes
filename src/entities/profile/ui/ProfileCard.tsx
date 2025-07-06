import { Text, UnstyledButton } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import type { Profile } from '../types'
import classes from './ProfileCard.module.css'

interface ProfileCardProps {
	profile: Profile
	onClick: () => void
}
export const ProfileCard = (props: ProfileCardProps) => {
	const { onClick, profile } = props

	return (
		<UnstyledButton
			key={profile.id}
			className={classes.profile}
			onClick={onClick}
		>
			<IconUser size={32} />
			<Text size='xs' mt={7}>
				{profile.name}
			</Text>
		</UnstyledButton>
	)
}
