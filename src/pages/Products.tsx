import { ReactElement, useCallback, useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link,  } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa"; 
//search icon: react-icons/fa
import axios from "axios";


import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import SearchIcon from "@material-ui/icons/Search";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import RefreshIcon from "@material-ui/icons/Refresh";
import React from "react";


import CreateProductForm from "../components/CreateProductForm";

interface DataType {
	photo: ReactElement;
	name: string;
	price: number;
	stock: number;
	action: string;
}

const columns: Column<DataType>[] = [
	{
		Header: "Photo",
		accessor: "photo",
	},
	{
		Header: "Name",
		accessor: "name",
	},
	{
		Header: "Price",
		accessor: "price",
	},
	{
		Header: "Stock",
		accessor: "stock",
	},
	// {
	// 	Header: "Action",
	// 	accessor: "action",
	// },
];

const img = "https://m.media-amazon.com/images/I/71Un+LxdqYL._AC_UL480_FMwebp_QL65_.jpg";
const img1 = "https://m.media-amazon.com/images/I/91ExqbocT9L._SL1500_.jpg";



const arr: DataType[] = [
	{
		photo: <img src={img} alt="Shoes" />,
		name: "Puma Shoes Air jordan Cook Nigga 2023",
		price: 690,
		stock: 3,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img1} alt="Shoes" />,
		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
		price: 7999,
		stock: 33,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img} alt="Shoes" />,
		name: "Puma Shoes Air jordan Cook Nigga 2023",
		price: 690,
		stock: 3,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img1} alt="Shoes" />,
		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
		price: 7999,
		stock: 33,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img} alt="Shoes" />,
		name: "Puma Shoes Air jordan Cook Nigga 2023",
		price: 690,
		stock: 3,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img1} alt="Shoes" />,
		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
		price: 7999,
		stock: 33,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img} alt="Shoes" />,
		name: "Puma Shoes Air jordan Cook Nigga 2023",
		price: 690,
		stock: 3,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img1} alt="Shoes" />,
		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
		price: 7999,
		stock: 33,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img} alt="Shoes" />,
		name: "Puma Shoes Air jordan Cook Nigga 2023",
		price: 690,
		stock: 3,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img1} alt="Shoes" />,
		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
		price: 7999,
		stock: 33,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img} alt="Shoes" />,
		name: "Puma Shoes Air jordan Cook Nigga 2023",
		price: 690,
		stock: 3,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img1} alt="Shoes" />,
		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
		price: 7999,
		stock: 33,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img} alt="Shoes" />,
		name: "Puma Shoes Air jordan Cook Nigga 2023",
		price: 690,
		stock: 3,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img1} alt="Shoes" />,
		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
		price: 7999,
		stock: 33,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img} alt="Shoes" />,
		name: "Puma Shoes Air jordan Cook Nigga 2023",
		price: 690,
		stock: 3,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img1} alt="Shoes" />,
		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
		price: 7999,
		stock: 33,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img} alt="Shoes" />,
		name: "Puma Shoes Air jordan Cook Nigga 2023",
		price: 690,
		stock: 3,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img1} alt="Shoes" />,
		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
		price: 7999,
		stock: 33,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img} alt="Shoes" />,
		name: "Puma Shoes Air jordan Cook Nigga 2023",
		price: 690,
		stock: 3,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img1} alt="Shoes" />,
		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
		price: 7999,
		stock: 33,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img} alt="Shoes" />,
		name: "Puma Shoes Air jordan Cook Nigga 2023",
		price: 690,
		stock: 3,
		action: "/admin/product/sajknaskd"
	},
	{
		photo: <img src={img1} alt="Shoes" />,
		name: "Ambrane Extension Board, 10 Ports with 4 USB Ports",
		price: 7999,
		stock: 33,
		action: "/admin/product/sajknaskd"
	},
];


const useStyles = makeStyles((theme) => ({
	fab: {
	  margin: 0,
	  top: "auto",
	  left: "auto",
	  position: "fixed",
	  bottom: theme.spacing(7),
	  right: theme.spacing(7),
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
	createProductModal: {
	  display: "flex",
	  alignItems: "center",
	  justifyContent: "center",
	  overflow: "scroll",
	},
	paper: {
	  backgroundColor: theme.palette.background.paper,
	  // boxShadow: theme.shadows[5],
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
	  // boxShadow: '0 0 1px 0 rgba(0,0,0,.22)',
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
const Products = () => {
	const [data, setData] = useState<DataType[]>([]);
	const classes = useStyles();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get("http://localhost:8080/products");
				setData(result.data.map((product: any) => {
					return {
						photo: <img src={`https://${product.imageUrl}`} alt={product.category} />,
						name: product.name,
						price: product.price,
						stock:  5,
						action: `/admin/product/${product.id}`
					}
				}));
			}catch(err) {
				console.log(err);
				setData([]);
			}
		}
		fetchData();
	}, []);
	const Table = useCallback(TableHOC<DataType>(columns, data, "dashboard-product-box", "Products", true), [data]);

	return (
		<div className="admin-container" style={{color: "rgb(234, 236, 239)"}}>
			<AdminSidebar />
			<main className="products">{Table()}</main>
			<Link to="/admin/product/new" className="create-product-btn">
				<FaPlus />
			</Link>
			{/* <Link to="/admin/product/new" className="search-product-btn" style={{
				backgroundColor: "rgb(234, 236, 239)",
				// boxShadow: theme.shadows[5],
				boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
				padding: "1rem",
				outline: "none",
				borderRadius: "8px",
			}}>
				<FaSearch />
			</Link> */}
			<Modal
         disableAutoFocus={true}
		 className={classes.modal}
		 open={false}
		 BackdropComponent={Backdrop}
		 BackdropProps={{
		   timeout: 500,
		 }}
		 closeAfterTransition
		 disableBackdropClick
      >
        <Fade >
          <div className={classes.paper}>
            <CreateProductForm />
          </div>
        </Fade>
      </Modal>
		</div>
	);
};

export default Products;
