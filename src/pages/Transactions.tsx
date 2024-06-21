import { ReactElement, useCallback, useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import axios from "axios";
import { format } from 'date-fns';
import { makeStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SearchIcon from "@material-ui/icons/Search";
import SearchModal from "../components/SearchModal";

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
const useStyles = makeStyles((theme) => ({
	fab: {
	  margin: 0,
	  top: "auto",
	  left: "auto",
	  position: "fixed",
	  bottom: theme.spacing(7),
	  right: theme.spacing(7),
	  '& :hover': {
		opacity: 0.8
	  }
	},
	action: {
	  marginLeft: "auto",
	  marginTop: "0.8rem",
	  marginRight: theme.spacing(2),
	},
	modal: {
	  display: "flex",
	  alignItems: "center",
	  justifyContent: "center",
	},
	createSupplierModal: {
	  display: "flex",
	  alignItems: "center",
	  justifyContent: "center",
	  overflow: "scroll",
	},
	paper: {
	  backgroundColor: "rgb(24, 26, 32)",
	  boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
	  padding: theme.spacing(2, 4, 3),
	  outline: "none",
	  borderRadius: "8px",
	},
	emptyIcon: {
	  color: "#00000032",
	  fontSize: "10em",
	},
	emptyContainer: {
	  marginTop: "25vh",
	},
	title: {
	  fontFamily: "ApercuMedium",
	  marginTop: theme.spacing(4),
	  marginBottom: theme.spacing(4),
	},
	button: {
	  margin: theme.spacing(1),
	},
	toolbar: {
	  boxShadow: "0 0 11px #eaf0f6",
	  display: "inline-block",
	  marginBottom: theme.spacing(1),
	  width: "100%",
	},
	lastUpdated: {
	  marginTop: theme.spacing(2),
	  padding: 0,
	  color: "rgb(112, 117, 122)",
	},
  }));
const columns: Column<DataType>[] = [
	{
		Header: "ID",
		accessor: "orderID",
	},
	{
		Header: "Ngày tạo",
		accessor: "created",
		Cell: ({ value }) => format(new Date(value), 'MM/dd/yyyy hh:mm a'),
	},
	{
		Header: "Khách hàng",
		accessor: "customer",
	},
	// {
	// 	Header: "Email",
	// 	accessor: "email",
	// },
	{
		Header: "Tổng tiền",
		accessor: "total",
	},
	{
		Header: "Trạng thái",
		accessor: "status",
	},
	{
		Header: "Lần cập nhật cuối",
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
	const [data, setData] = useState<DataType[]>([]);
	const [searchModal, setSearchModal] = useState(false);
    const classes = useStyles();

	const openSearchModal = () => {
	  setSearchModal(true);
	};
  
	const closeSearchModal = () => {
	  setSearchModal(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get("http://localhost:8080/orders");
				console.log(result.data);
				setData(result.data.map((order: any) => {
					return {
						orderID: order.id,
						created:  order.orderDate ,
						customer: order.userId,
						// email: "order.email",
						total: order.subtotal,
						status: <span className="red" style={{color: (order.orderStatus === "DELIVERED")? "rgb(122, 200, 180)": order.orderStatus === "PROCESSING" ? "rgb(157, 90, 98)": "rgb(240, 185, 11)"}}>{order.orderStatus}</span>, //rgb(132, 142, 156)
						lastUpdated: "Today",
						action: `/admin/transaction/${order.id}`
					}
				}));
			}catch(err) {
				console.log(err);
				setData([]);
			}
		}
		fetchData();
	}, []);

	const Table = useCallback(TableHOC<DataType>(columns, data, "dashboard-product-box", "Danh sách đơn hàng", true, 9), [data]);

	const transitionDuration = {
		enter: 0.5,
		exit: 0.5,
	  };
	
	return (
		<div className="admin-container" style={{color: "rgb(234, 236, 239)"}}>
			<AdminSidebar />
			<main>{Table()}</main>
		</div>
	);
};

export default Transactions;
