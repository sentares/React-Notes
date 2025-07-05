export interface Note {
	id: string
	title: string
	createdAt: {
		nanoseconds: number
		seconds: number
	}
}
