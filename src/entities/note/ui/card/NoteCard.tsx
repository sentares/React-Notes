import { useNotesContext } from '@/app/providers/context'
import { internalPaths } from '@/app/providers/router'
import { getHighlightedHtml, parseTimestamp } from '@/shared/utils'
import { Card, Text } from '@mantine/core'
import { marked } from 'marked'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Note } from '../../types'
import classes from './NoteCard.module.css'

interface NoteCardProps {
	note: Note
}

export const NoteCard = ({ note }: NoteCardProps) => {
	const navigate = useNavigate()
	const { setActiveNote, activeNote, searchQuery } = useNotesContext()
	const [html, setHtml] = useState('')

	const isActive = activeNote?.id === note.id

	const handleClickNote = () => {
		setActiveNote(note)
		navigate(internalPaths.note.detail(note.id))
	}

	const parseHtml = async () => {
		const rawHtml = await marked.parse(note.title)
		const highlightedHtml = getHighlightedHtml(rawHtml, searchQuery, true)
		setHtml(highlightedHtml)
	}

	useEffect(() => {
		parseHtml()
	}, [note.title, searchQuery])

	return (
		<Card
			withBorder
			shadow='sm'
			radius='md'
			bg={isActive ? 'gray' : ''}
			className={classes.card}
			onClick={handleClickNote}
		>
			<div
				className={classes.cardText}
				dangerouslySetInnerHTML={{ __html: html }}
				style={{ whiteSpace: 'pre-wrap' }}
			/>

			<Text
				size='xs'
				className={classes.cardDate}
				c={isActive ? 'black' : 'dimmed'}
			>
				{parseTimestamp(note.createdAt).toLocaleString()}
			</Text>
		</Card>
	)
}
