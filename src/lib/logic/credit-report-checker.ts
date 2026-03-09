export type CreditReportCheckItem = {
	id: string;
	title: string;
	category: string;
	whatToLookFor: string;
	whatToDo: string;
};

export const creditReportChecklist: CreditReportCheckItem[] = [
	{
		id: 'personal-details',
		title: 'Personal details (name, date of birth, address)',
		category: 'Basics',
		whatToLookFor:
			'Check that your full name, date of birth and current address are correct. Look out for old addresses that should no longer be linked, or spelling mistakes in your name.',
		whatToDo:
			'If something is wrong, update your details directly with your lender(s) and your credit report provider. You can usually raise a dispute through your online credit report account or by contacting the agency.'
	},
	{
		id: 'linked-addresses',
		title: 'Old or unknown addresses',
		category: 'Basics',
		whatToLookFor:
			'Look for old addresses you have never lived at, or links to addresses that you do not recognise at all.',
		whatToDo:
			'If you see an address you do not recognise, contact the credit reference agency and ask them to explain it. If it is wrong, raise a dispute and provide any proof you have of your actual address history.'
	},
	{
		id: 'electoral-roll',
		title: 'Electoral roll (on the register to vote)',
		category: 'Basics',
		whatToLookFor:
			'Check whether your report shows that you are registered on the electoral roll at your current address.',
		whatToDo:
			'If you are registered to vote but it is not showing, contact your local council and the credit reference agency to ask for an update. If you are not registered, consider registering to vote, as this can help some lenders verify your identity.'
	},
	{
		id: 'duplicate-accounts',
		title: 'Duplicate or unfamiliar accounts',
		category: 'Accounts',
		whatToLookFor:
			'Look for accounts you do not recognise, or the same account appearing twice with slightly different details.',
		whatToDo:
			'If you do not recognise an account, contact the lender straight away to check whether it is genuine. If you think it is fraud, tell the lender and the credit reference agency and follow their fraud procedures.'
	},
	{
		id: 'closed-accounts',
		title: 'Accounts that should be closed',
		category: 'Accounts',
		whatToLookFor:
			'Check whether accounts you have fully closed are still showing as open, or with a balance.',
		whatToDo:
			'If a closed account still shows as open or in use, ask the lender to update their records and report the correct status to all relevant credit reference agencies.'
	},
	{
		id: 'payment-history',
		title: 'Payment history and late markers',
		category: 'Payments',
		whatToLookFor:
			'Check for late payment markers or missed payments that you do not agree with, or that appear in the wrong month.',
		whatToDo:
			'If you believe a late or missed payment is incorrect, contact the lender first and ask them to investigate. If they agree it is wrong, they should update the credit reference agencies. If they refuse and you still disagree, you can raise a formal dispute with the agency.'
	},
	{
		id: 'defaults',
		title: 'Defaults and arrears',
		category: 'Negative markers',
		whatToLookFor:
			'Look at any defaults or serious arrears. Check the default date and whether the account details match your records.',
		whatToDo:
			'If the default date or balance looks wrong, contact the lender and ask them to explain or correct it. A default usually stays on your file for six years from the default date, even if you later pay it off.'
	},
	{
		id: 'ccj-markers',
		title: 'County Court Judgment (CCJ) entries',
		category: 'Negative markers',
		whatToLookFor:
			'Check any CCJ entries against your own paperwork. Look at the court, date of judgment and amount.',
		whatToDo:
			'If you think a CCJ entry is wrong or does not belong to you, contact the court named on the judgment and the credit reference agency. If you have paid a CCJ in full, ask the court or Registry Trust how to have the record updated.'
	},
	{
		id: 'associations',
		title: 'Financial associations (linked people)',
		category: 'Other',
		whatToLookFor:
			'Look for people listed as financially associated with you (for example, someone you had a joint account or joint credit with).',
		whatToDo:
			'If you are still financially linked, this may be correct. If the association is out of date (for example, you no longer share any financial products), ask the credit reference agency how to remove or update the association.'
	},
	{
		id: 'notice-of-correction',
		title: 'Notice of correction or dispute notes',
		category: 'Other',
		whatToLookFor:
			'Check for any short explanations or “notice of correction” text that you or a lender have added in the past.',
		whatToDo:
			'Make sure any notices still reflect your situation. If something is out of date or no longer needed, ask the credit reference agency how to update or remove it.'
	}
];

