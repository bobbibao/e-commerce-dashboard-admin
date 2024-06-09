import { ReactElement, useCallback, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import TableHOC from "../components/TableHOC";

interface DataType {
	orderID: number;
	created: string;
	customer: string;
	email: string;
	total: number;
	status: ReactElement;
	lastUpdated: string;
	action: string;
	// action: ReactElement;
}

const columns: Column<DataType>[] = [
	{
		Header: "Order ID",
		accessor: "orderID",
	},
	{
		Header: "Created",
		accessor: "created",
	},
	{
		Header: "Customer",
		accessor: "customer",
	},
	{
		Header: "Email",
		accessor: "email",
	},
	{
		Header: "Total",
		accessor: "total",
	},
	{
		Header: "Status",
		accessor: "status",
	},
	{
		Header: "Last Updated",
		accessor: "lastUpdated",
	},
	// {
	// 	Header: "Action",
	// 	accessor: "action",
	// },

];

const arr: DataType[] = [
	// {
	// 	orderID: 1,
	// 	created: "2015-03-25",
	// 	user: "Aryan Gupta",
	// 	amount: 7799,
	// 	discount: 450,
	// 	quantity: 2,
	// 	status: <span className="red" style={{color: "rgb(132, 142, 156)"}}>Processing</span>,
	// 	action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
	// },
	// {
	// 	orderID: 2,
	// 	created: "2015-03-25",
	// 	user: "Neha Sharma",
	// 	amount: 4099,
	// 	discount: 400,
	// 	quantity: 6,
	// 	status: <span style={{color: "rgb(240, 185, 11)"}}>Shipping</span>,
	// 	action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
	// },
	// {
	// 	orderID: 3,
	// 	created: "2015-03-25",
	// 	user: "Rohit Shetty",
	// 	amount: 1399,
	// 	discount: 200,
	// 	quantity: 5,
	// 	status: <span style={{color: "rgb(14, 203, 129)"}}>Delivered</span>,
	// 	action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
	// },
	{
		orderID: 1,
		created: "2015-03-25",
		customer: "Aryan Gupta",
		email: "asdan@gmail.com",
		total: 7799,
		status: <span className="red" style={{color: "rgb(132, 142, 156)"}}>Processing</span>,
		lastUpdated: "Today",
		action: "/admin/transaction/sajknaskd",
		// action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
	},{
		orderID: 1,
		created: "2015-03-25",
		customer: "Aryan Gupta",
		email: "asdan@gmail.com",
		total: 7799,
		status: <span className="red" style={{color: "rgb(132, 142, 156)"}}>Processing</span>,
		lastUpdated: "Today",
		action: "/admin/transaction/sajknaskd",
		// action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
	},{
		orderID: 1,
		created: "2015-03-25",
		customer: "Aryan Gupta",
		email: "asdan@gmail.com",
		total: 7799,
		status: <span className="red" style={{color: "rgb(132, 142, 156)"}}>Processing</span>,
		lastUpdated: "Today",
		action: "/admin/transaction/sajknaskd",
		// action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
	},
];

const Transactions = () => {
	const [data] = useState<DataType[]>(arr);

	const Table = useCallback(TableHOC<DataType>(columns, data, "dashboard-product-box", "Transactions", true), []);

	return (
		<div className="admin-container" style={{color: "rgb(234, 236, 239)"}}>
			<AdminSidebar />
			<main>{Table()}</main>
		</div>
	);
};

export default Transactions;
