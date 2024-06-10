/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTable, Column, TableOptions, useSortBy, usePagination } from "react-table";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';

// ...rest of your code
function TableHOC<T extends Object>(columns: Column<T>[], data: T[], containerClassName: string, heading: string, showPagination: boolean = false) {
	const navigate = useNavigate();

	return function HOC() {
		const options: TableOptions<T> = {
			columns,
			data,
			initialState: {
				pageSize: 5,
			},
		};
		const {
			getTableProps,
			getTableBodyProps,
			headerGroups,
			page,
			prepareRow,
			nextPage,
			previousPage,
			canNextPage,
			canPreviousPage,
			pageCount,
			gotoPage,
			state: { pageIndex },
		} = useTable(options, useSortBy, usePagination);

		return (
			<div className={containerClassName}>
				<h2 className="heading">{heading}</h2>
				<table className="table" {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
										{column.render("Header")}
										{column.isSorted && (
											<span>{column.isSortedDesc ? <AiOutlineSortDescending /> : <AiOutlineSortAscending />}</span>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							// console.log(row);
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} key={row.values.orderID} onClick={() => navigate(row.original?.action)}>
								{row.cells.map((cell, i) => (
								  <td {...cell.getCellProps()} style={{ textAlign: cell.column?.id === "orderID" ? 'center' : 'left' }} key={i}>
									{cell.render("Cell")}
								  </td>
								))}
								<td>
								  <IconButton size="small" aria-label="settings" style={{color: "rgb(240, 185, 11)"}}>
									<KeyboardArrowRightIcon />
								  </IconButton>
								</td>
							  </tr>
							);
						})}
					</tbody>
				</table>
				{showPagination && pageCount >= 5 && (
					<div className="table-pagination">
						<button disabled={!canPreviousPage} onClick={previousPage}>
							Prev
						</button>
						<span>{`${pageIndex + 1} of ${pageCount}`}</span>
						<button disabled={!canNextPage} onClick={nextPage}>
							Next
						</button>
						<button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
							Go to Last Page
						</button>
					</div>
				)}
			</div>
		);
	};
}

export default TableHOC;
