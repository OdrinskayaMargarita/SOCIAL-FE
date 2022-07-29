export const cooperatorPrice = "2.30";

export const articleHTMLFormats = [
	"header",
	"bold",
	"underline",
	"strike",
	"list",
	"bullet",
	"link",
	"image",
	"video",
];

export const articleHTMLModules = {
	toolbar: [
		[{ header: "2" }],
		["bold", "underline", "strike"],
		[{ list: "ordered" }, { list: "bullet" }],
		["link", "image", "video"],
		["clean"],
	],
	clipboard: {
		matchVisual: false,
	},
};

export const eventHTMLFormats = ["header", "bold", "underline", "strike", "list", "bullet", "link"];

export const eventHTMLModules = {
	toolbar: [
		[{ header: "2" }],
		["bold", "underline", "strike"],
		[{ list: "ordered" }, { list: "bullet" }],
		["link"],
		["clean"],
	],
	clipboard: {
		matchVisual: false,
	},
};

export const BYTES_LIMIT = 5000000;
