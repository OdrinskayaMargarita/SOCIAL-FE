export const mockContentImages = () => {
	const mockGalleryLength = Math.floor(Math.random() * 10);
	return mockGalleryLength > 0
		? new Array(mockGalleryLength).fill().map((_, index) => {
				return {
					filename: index,
					url: `https://picsum.photos/1000/800?random=${(index + 1) * mockGalleryLength}`,
				};
		  })
		: [];
};

export const TOP_GROUPS = [
	{
		id: 1,
		name: "Finance Club",
		membersAmount: 2345,
		postsAmount: 375,
	},
	{
		id: 2,
		name: "Harvard Business Review Discussion Group",
		membersAmount: 2345,
		postsAmount: 375,
	},
	{
		id: 3,
		name: "Growht Factory",
		membersAmount: 2345,
		postsAmount: 375,
	},
];

export const GROUPS = [
	{
		id: 1,
		name: "Marketing Communication",
		description: "The FINANCE CLUB focusses on helping finance professionals",
		members: 34,
		posts: 345,
	},
	{
		id: 2,
		name: "Digital Marketing",
		description: "Digital Marketing is one of the most exciting and dynamic groups",
		members: 56,
		posts: 67,
	},
	{
		id: 3,
		name: "Harvard Business Review Discussion Group",
		description: "Marketing Communication: messages and related media used to commun...",
		members: 98,
		posts: 23,
	},
	{
		id: 4,
		name: 'СК "ЕкоДанилівка"',
		description: "Проект взаимовыгодного сотрудничества селян и горожан...",
		members: 132,
		posts: 435,
	},
	{
		id: 4,
		name: "Finance Club",
		description: "Digital Marketing is one of the most exciting and dynamic groups",
		members: 435,
		posts: 124,
	},
	{
		id: 5,
		name: "Marketing Communication",
		description: "The FINANCE CLUB focusses on helping finance professionals",
		members: 1435,
		posts: 856,
	},
];

export const GROUP = {
	id: 1,
	name: "Marketing Communication",
	description:
		"The FINANCE CLUB focusses on helping finance professionals to grow their industry network, enhance their career and close more deals.",
	location: {
		country: "Ukraine",
		city: "Kyiv",
	},
	feeds: [],
	members: [],
	articles: [],
	events: [],
	solutions: [],
};

export default TOP_GROUPS;
