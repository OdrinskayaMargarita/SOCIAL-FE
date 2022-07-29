export const GROUPS_LIST = [
	{
		headerName: "Group name",
		field: "avatar.url",
		cellRenderer: "imageCellRendered",
		width: 50,
	},
	{
		headerName: "",
		field: "name",
		cellRenderer: "nameCellRenderer",
		width: 170,
	},
	{
		headerName: "Description",
		field: "description",
		width: 220,
		cellRenderer: "descriptionCellRenderer",
	},
	{
		headerName: "Members",
		field: "members",
		width: 80,
		cellRenderer: "numberCellRenderer",
	},
	{
		headerName: "Posts",
		field: "posts",
		width: 30,
		cellRenderer: "numberCellRenderer",
	},
	{
		headerName: "",
		field: "id",
		width: 90,
		cellRenderer: "joinCellRenderer",
	},
];
