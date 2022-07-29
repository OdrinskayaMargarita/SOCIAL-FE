import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../core-components/Layout/Layout";
import LoadingComponent from "../../components/common/Loading/Loading";

const Loading = () => {
	const router = useRouter();
	useEffect(() => {
		router.replace("/social/groups");
	}, [router]);

	return (
		<Layout>
			<LoadingComponent />
		</Layout>
	);
};

export default Loading;
