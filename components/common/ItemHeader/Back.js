import React from "react";
import { useSelector } from "react-redux";
import { oneOf } from "prop-types";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const ItemHeaderBack = ({ tab }) => {
	const { translation } = useSelector((state) => state.app);
	const router = useRouter();

	const handleBack = (e) => {
		e.preventDefault();
		router.back();
	};

	return (
		<Link href={`/social/${tab}`} onClick={handleBack} underline="none">
			<Button variant="social-black" startIcon={<ArrowBackIcon style={{ marginRight: "0" }} />}>
				{translation?.["post.btnBack"]}
			</Button>
		</Link>
	);
};

ItemHeaderBack.propTypes = {
	tab: oneOf(["users", "solutions", "groups", "articles", "posts", "events"]),
};

export default ItemHeaderBack;
