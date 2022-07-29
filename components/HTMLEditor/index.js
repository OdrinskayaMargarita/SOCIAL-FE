import React, { useCallback } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

const HTMLEditor = ({ onChange, className, formats, modules, ...props }) => {
	return (
		<QuillNoSSRWrapper
			modules={modules}
			formats={formats}
			onChange={onChange}
			className={className}
			{...props}
		/>
	);
};

export default HTMLEditor;
