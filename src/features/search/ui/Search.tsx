import { useNotesContext } from '@/app/providers/context'
import { TextInput } from '@mantine/core'

export const Search = () => {
	const { searchQuery, setSearchQuery } = useNotesContext()

	return (
		<TextInput
			placeholder='Поиск...'
			value={searchQuery}
			onChange={event => setSearchQuery(event.currentTarget.value)}
		/>
	)
}
