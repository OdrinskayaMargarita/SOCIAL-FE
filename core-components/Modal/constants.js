import LoginModal from "./components/LoginModal/LoginModal";
import RegistrationModal from "./components/RegistrationModal/RegistrationModal";
import MembershipModal from "./components/MembershipModal/MembershipModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal/ForgotPasswordModal";
import CreateGroupModal from "./components/CreateGroupModal/CreateGroupModal";
import CreatePostModal from "./components/CreatePostModal/CreatePostModal";
import VotingModal from "./components/VotingModal/VotingModal";

// eslint-disable-next-line react/react-in-jsx-scope
const UnconfirmedModal = () => <RegistrationModal incomingStep={2} />;

export const MODAL_TYPES = {
	LOGIN_MODAL: "LOGIN_MODAL",
	REG_MODAL: "REG_MODAL",
	UNCONFIRMED_MODAL: "UNCONFIRMED_MODAL",
	MEMBER_MODAL: "MEMBER_MODAL",
	FORGOT_PASS_MODAL: "FORGOT_PASS_MODAL",
	CREATE_GROUP_MODAL: "CREATE_GROUP_MODAL",
	CREATE_POST_MODAL: "CREATE_POST_MODAL",
	OPEN_VOTING_MODAL: "OPEN_VOTING_MODAL",
};

export const MODAL_COMPONENTS = {
	[MODAL_TYPES.LOGIN_MODAL]: LoginModal,
	[MODAL_TYPES.REG_MODAL]: RegistrationModal,
	[MODAL_TYPES.UNCONFIRMED_MODAL]: UnconfirmedModal,
	[MODAL_TYPES.MEMBER_MODAL]: MembershipModal,
	[MODAL_TYPES.FORGOT_PASS_MODAL]: ForgotPasswordModal,
	[MODAL_TYPES.CREATE_GROUP_MODAL]: CreateGroupModal,
	[MODAL_TYPES.CREATE_POST_MODAL]: CreatePostModal,
	[MODAL_TYPES.OPEN_VOTING_MODAL]: VotingModal,
};
