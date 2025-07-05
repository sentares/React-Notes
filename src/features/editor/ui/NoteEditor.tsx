import { useState, useEffect } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import { Button, Group } from '@mantine/core'
import 'easymde/dist/easymde.min.css'
import classes from './NoteEditor.module.css'

interface NoteEditorProps {
	initialValue: string
	onSave: (value: string) => void
	onCancel: () => void
	onChange?: (value: string) => void
}

export const NoteEditor = ({
	initialValue,
	onSave,
	onCancel,
	onChange,
}: NoteEditorProps) => {
	const [value, setValue] = useState(initialValue)

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	const handleChange = (value: string) => {
		setValue(value)
		if (onChange) onChange(value)
	}

	return (
		<div className={classes.editor}>
			<Group mt='sm' mb='sm' justify='flex-end'>
				<Button
					variant='outline'
					color='gray'
					onClick={() => {
						setValue(initialValue)
						onCancel()
					}}
				>
					Отмена
				</Button>
				<Button onClick={() => onSave(value)}>Сохранить</Button>
			</Group>

			<SimpleMDE value={value} onChange={handleChange} />
		</div>
	)
}
