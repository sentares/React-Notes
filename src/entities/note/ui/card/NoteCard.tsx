import type { Note } from '../../types'
import { Card, Text, Button } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import classes from './NoteCard.module.css'
import { parseTimestamp } from '@/shared/utils'

interface NoteCardProps {
	note: Note
	onClick: () => void
}

export const NoteCard = ({ note, onClick }: NoteCardProps) => {
	console.log(note, 'note')

	return (
		<Card
			withBorder
			shadow='sm'
			radius='md'
			className={classes.card}
			onClick={onClick}
		>
			<Text className={classes.cardText}>{note.title}</Text>
			<Text size='xs' className={classes.cardDate}>
				{parseTimestamp(note.createdAt).toLocaleString()}
			</Text>
		</Card>
	)
}
