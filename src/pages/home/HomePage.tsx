import { ThemeToggle } from '@/shared/lib/theme'
import { Button, Input } from '@mantine/core'

const HomePage = () => {
	return (
		<>
			<Input size='lg' placeholder='Input component' />
			<Button>Click me</Button>
			<ThemeToggle />
		</>
	)
}

export default HomePage
