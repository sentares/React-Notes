import { createTheme, type MantineTheme } from '@mantine/core'

export const mantineTheme = createTheme({
	fontFamily: 'system-ui, sans-serif',
	defaultRadius: 'md',

	primaryColor: 'yellow',
	luminanceThreshold: 0.8,
	primaryShade: {
		light: 5,
		dark: 7,
	},

	// white: '#f1f1f1',
	// black: '#000000',

	// components: {
	// 	Button: {
	// 		styles: (theme: MantineTheme) => ({
	// 			root: {
	// 				color: theme.colors.dark[9],
	// 			},
	// 		}),
	// 	},
	// },

	breakpoints: {
		xs: '30em',
		sm: '48em',
		md: '64em',
		lg: '74em',
		xl: '90em',
	},
})
