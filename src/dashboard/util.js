export const prepareWorkingSummary = working => [
	{ value: working, name: 'Working'}, 
	{ value: 100 - working, name: 'Others'}
];
