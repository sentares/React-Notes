import { Text, UnstyledButton } from '@mantine/core'
import type { Profile } from '../types'
import classes from './ProfileCard.module.css'
import { IconUser } from '@tabler/icons-react'

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
