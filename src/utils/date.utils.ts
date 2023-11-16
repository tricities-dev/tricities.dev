	export const dateFormat = (date:Date) => {
		return date.toLocaleDateString('en-US', {
			timeZone: 'America/New_York',
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		})
	}
