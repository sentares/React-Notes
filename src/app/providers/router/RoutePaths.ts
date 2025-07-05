export const internalPaths = {
	home: '/',
	auth: '/auth',
	note: {
		base: 'note',
		detail: (id: string) => `/note/${id}`,
	},
} as const
