import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

export const HEADER_MENU_ITEMS = [
	{
		url: "/social",
		title: "site_header.social_button",
	},
	{
		url: "/about",
		title: "site_header.about_button",
		alt: "site_header.p2p_button_soon",
		disabled: true,
	},
	{
		url: "/market",
		title: "site_header.market_button",
		alt: "site_header.p2p_button_soon",
		disabled: true,
	},
	{
		url: "/p2p",
		title: "site_header.p2p_button",
		alt: "site_header.p2p_button_soon",
		disabled: true,
	},
];
export const SIDEBAR_MAIN_ITEMS = [
	{
		url: "/social/news",
		title: "social_left_sidebar.news_feed_button",
		Icon: HomeOutlinedIcon,
	},
	{
		url: "/social/groups",
		title: "social_left_sidebar.groups_button",
		Icon: GroupsOutlinedIcon,
	},
	{
		url: "/social/users",
		title: "social_left_sidebar.people_button",
		Icon: PeopleAltOutlinedIcon,
	},
	{
		url: "/social/articles",
		title: "social_left_sidebar.articles_button",
		Icon: ArticleOutlinedIcon,
	},
	{
		url: "/social/events",
		title: "social_left_sidebar.events_button",
		Icon: StarBorderPurple500OutlinedIcon,
	},
	{
		url: "/social/solutions",
		title: "social_left_sidebar.solutions_button",
		Icon: LightbulbOutlinedIcon,
	},
	{
		url: "/social/proposals",
		title: "proposals.section",
		Icon: ExpandCircleDownOutlinedIcon,
	},
];

export const SIDEBAR_PROFILE_ITEMS = [
	{
		url: "/profile",
		title: "profile_left_sidebar.my_profile_button",
		Icon: PermIdentityOutlinedIcon,
	},
	{
		url: "/messages",
		title: "profile_left_sidebar.my_messages_button",
		Icon: EmailOutlinedIcon,
	},
	// {
	// 	url: "/wallet",
	// 	title: "profile_left_sidebar.wallet_button",
	// 	Icon: AccountBalanceWalletOutlinedIcon,
	// },
];
