import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import TableMUI from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRowMUI from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";

const TableRow = ({ columns, row = {}, isLoading, onRowClick }) => (
	<TableRowMUI
		hover={Boolean(onRowClick)}
		onClick={() => onRowClick?.(row)}
		sx={{ cursor: onRowClick ? "pointer" : "inherit" }}
	>
		{columns.map(({ id, Component, ...props }) => (
			<TableCell sx={{ px: 2.5 }} key={id} {...props}>
				{Component ? (
					<Component row={row} isLoadingState={isLoading} />
				) : isLoading ? (
					<Skeleton />
				) : (
					row[id]
				)}
			</TableCell>
		))}
	</TableRowMUI>
);

export const Table = ({
	data,
	columns,
	isLoading,
	loadingRows = 5,
	BodyWrapperComponent = React.Fragment,
	BodyWrapperProps = {},
	onRowClick,
	onSort,
}) => {
	const [orderBy, setOrderBy] = useState("name");
	const [order, setOrder] = useState("asc");

	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
		onSort?.(property, isAsc ? "desc" : "asc");
	};

	return (
		<TableContainer>
			<TableMUI>
				<TableHead>
					<TableRowMUI>
						{columns.map(({ id, name, sortable, ...props }) => (
							<TableCell
								sx={{ py: 1, px: 2.5, fontSize: "12px" }}
								key={id}
								sortDirection={orderBy === id ? order : false}
								{...props}
							>
								{sortable ? (
									<TableSortLabel
										active={orderBy === id}
										direction={orderBy === id ? order : "asc"}
										onClick={() => handleRequestSort(id)}
									>
										{name}
									</TableSortLabel>
								) : (
									name
								)}
							</TableCell>
						))}
					</TableRowMUI>
				</TableHead>
				<TableBody>
					<BodyWrapperComponent {...BodyWrapperProps}>
						{data.map((row, idx) => (
							<TableRow key={idx} columns={columns} row={row} onRowClick={onRowClick} />
						))}
						{Array.from({ length: isLoading ? loadingRows : 0 }).map((idx) => (
							<TableRow key={idx} columns={columns} isLoading />
						))}
					</BodyWrapperComponent>
				</TableBody>
			</TableMUI>
		</TableContainer>
	);
};

export const InfiniteTable = ({
	data,
	columns = [],
	isLoading,
	onRowClick,
	onSort,
	infinityScrollProps = {},
}) => {
	return (
		<InfiniteScroll
			loader={
				<Box p={2} display="flex" justifyContent="center">
					<CircularProgress />
				</Box>
			}
			{...infinityScrollProps}
		>
			<Table
				data={data}
				columns={columns}
				isLoading={isLoading}
				onRowClick={onRowClick}
				onSort={onSort}
			/>
		</InfiniteScroll>
	);
};
