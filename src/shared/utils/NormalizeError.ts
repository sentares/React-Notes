export const normalizeError = (
	error: unknown,
	fallbackMessage: string
): Error => (error instanceof Error ? error : new Error(fallbackMessage))
