import { createTheme } from '@mantine/core'

export const mantineTheme = createTheme({
	fontFamily: 'system-ui, sans-serif',
	defaultRadius: 'md',

	primaryColor: 'yellow',
	primaryShade: {
		light: 6,
		dark: 7,
	},

	breakpoints: {
		xs: '30em',
		sm: '48em',
		md: '64em',
		lg: '74em',
		xl: '90em',
	},
})
