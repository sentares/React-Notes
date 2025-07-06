import { LoadingOverlay, Button, Group, Box } from '@mantine/core'

export const Loader = () => {
	return (
		<Box pos='relative'>
			<LoadingOverlay
				visible={true}
				zIndex={1000}
				overlayProps={{ radius: 'sm', blur: 2 }}
			/>
		</Box>
	)
}
