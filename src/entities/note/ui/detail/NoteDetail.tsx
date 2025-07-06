import { useNotesContext } from '@/app/providers/context'
import { getHighlightedHtml } from '@/shared/utils'
import { Button, Group } from '@mantine/core'
import { marked } from 'marked'
import { useEffect, useState } from 'react'

interface NoteDetailProps {
	markdownText: string
	onEdit?: () => void
	onDelete?: () => void
}

export const NoteDetail = ({
	markdownText,
	onEdit,
	onDelete,
}: NoteDetailProps) => {
	const { searchQuery } = useNotesContext()
	const [html, setHtml] = useState('')

	const parseHtml = async () => {
		const rawHtml = await marked.parse(markdownText)
		const highlightedHtml = getHighlightedHtml(rawHtml, searchQuery)
		setHtml(highlightedHtml)
	}

	useEffect(() => {
		parseHtml()
	}, [markdownText, searchQuery])

	return (
		<div>
			<Group mt='sm' mb='sm' justify='flex-end'>
				<Button color='red' variant='outline' onClick={onDelete}>
					Удалить
				</Button>
				<Button onClick={onEdit}>Редактировать</Button>
			</Group>

			<div
				dangerouslySetInnerHTML={{ __html: html }}
				style={{ whiteSpace: 'pre-wrap' }}
			/>
		</div>
	)
}
