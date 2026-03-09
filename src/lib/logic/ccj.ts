export type CcjOutcome = {
	dropOffDate: Date;
	dropOffDateString: string;
	payWithinMonthDeadlineDate: Date;
	payWithinMonthDeadlineString: string;
	summary: string;
	details: string[];
};

function formatDate(date: Date): string {
	return date.toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

function addYears(date: Date, years: number): Date {
	const copy = new Date(date.getTime());
	copy.setFullYear(copy.getFullYear() + years);
	return copy;
}

function addCalendarMonths(date: Date, months: number): Date {
	const copy = new Date(date.getTime());
	const day = copy.getDate();
	copy.setMonth(copy.getMonth() + months);

	// If the original day does not exist in the target month (e.g. 31st),
	// Date will roll into the following month. In that case, move to the last
	// day of the intended month instead.
	if (copy.getDate() < day) {
		copy.setDate(0);
	}

	return copy;
}

export function calculateCcjOutcome(judgmentDateInput: string, paidWithinOneMonth: boolean): CcjOutcome {
	const judgmentDate = new Date(judgmentDateInput);

	if (Number.isNaN(judgmentDate.getTime())) {
		throw new Error('Invalid judgment date');
	}

	const dropOffDate = addYears(judgmentDate, 6);
	const payWithinMonthDeadlineDate = addCalendarMonths(judgmentDate, 1);

	const dropOffDateString = formatDate(dropOffDate);
	const payWithinMonthDeadlineString = formatDate(payWithinMonthDeadlineDate);

	const details: string[] = [
		'A County Court Judgment (CCJ) will usually stay on your UK credit file for six years from the date of judgment.',
		'If it is not paid in full within one calendar month, it normally stays on your file for the full six years.',
		'If you pay it in full within one calendar month and the court records this, you can usually have the CCJ removed from public records.'
	];

	let summary: string;

	if (paidWithinOneMonth) {
		summary =
			`If your CCJ was paid in full within one calendar month and the court recorded this, it can normally be removed ` +
			`rather than staying on your credit file for the full six years. Otherwise it would have been due to drop off on ${dropOffDateString}.`;
	} else {
		summary = `Based on the judgment date you entered, the CCJ is due to drop off your credit file on ${dropOffDateString}.`;
	}

	return {
		dropOffDate,
		dropOffDateString,
		payWithinMonthDeadlineDate,
		payWithinMonthDeadlineString,
		summary,
		details
	};
}

