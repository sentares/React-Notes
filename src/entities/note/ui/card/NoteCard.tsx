import type { Note } from '../../types'
import { Card, Text, Button } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import classes from './NoteCard.module.css'

interface NoteCardProps {
	note: Note
	onClick: () => void
}

export const NoteCard = ({ note, onClick }: NoteCardProps) => {
	return (
		<Card
			withBorder
			shadow='sm'
			radius='md'
			className={classes.card}
			onClick={onClick}
		>
			<Text size='sm' className={classes.cardText}>
				{note.title}
			</Text>
		</Card>
	)
}
