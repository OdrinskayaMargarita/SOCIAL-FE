import React from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EntityPageHeader = ({ backLabel, backLink }) => (
	<div>
		<h2 size="medium">
			<Link href={backLink}>
				<div>
					<ArrowBackIcon />
					{backLabel}
				</div>
			</Link>
		</h2>
	</div>
);

export default EntityPageHeader;
