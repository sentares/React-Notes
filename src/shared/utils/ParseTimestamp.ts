export const parseTimestamp = (timestamp?: {
	seconds: number
	nanoseconds: number
}): Date => {
	return timestamp ? new Date(timestamp.seconds * 1000) : new Date()
}
