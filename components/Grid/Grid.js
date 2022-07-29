import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { AgGridReact } from "ag-grid-react";

const Grid = ({ data, columnDefs, ...rest }) => (
	<AgGridReact
		columnDefs={columnDefs}
		defaultColDef={columnDefs}
		rowData={data}
		gridOptions={{
			rowHeight: 61,
			serverSideStoreType: "partial",
			cellStyle: {
				"white-space": "normal",
			},
		}}
		{...rest}
	/>
);

export default Grid;
