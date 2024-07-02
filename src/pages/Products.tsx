import { ReactElement, useCallback, useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link,  } from "react-router-dom";
import { FaPlus } from "react-icons/fa"; 
import SearchModal from "../components/SearchModal";

//search icon: react-icons/fa
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

interface DataType {
	photo: ReactElement;
	id: string;
	name: string;
	price: string;
	stock: number;
	action: string;
}

const columns: Column<DataType>[] = [
	{
		Header: "Photo",
		accessor: "photo",
	},
	{
		Header: "ID",
		accessor: "id",
	},
	{
		Header: "Tên sản phẩm",
		accessor: "name",
	},
	{
		Header: "Giá bán",
		accessor: "price",
	},
	{
		Header: "Số lượng tồn kho",
		accessor: "stock",
	},
	// {
	// 	Header: "Action",
	// 	accessor: "action",
	// },
];

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
	createProductModal: {
	  display: "flex",
	  alignItems: "center",
	  justifyContent: "center",
	  overflow: "scroll",
	},
	paper: {
	  backgroundColor: "rgb(24, 26, 32)",
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
	const [searchModal, setSearchModal] = React.useState(false);

	const openSearchModal = () => {
		setSearchModal(true);
	  };
	
	  const closeSearchModal = () => {
		setSearchModal(false);
	  };
	const formatCurrency = (value: number) => {
	return value.toLocaleString("vi-VN", {
		style: "currency",
		currency: "VND",
	});
};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get("http://localhost:8080/products");
				console.log(result.data);
				setData(result.data.map((product: any) => {
					return {
						photo: <img src={`https://${product.imageUrl}`} alt={product.category} />,
						id: product.id,
						name: product.name,
						price:  formatCurrency(product.price),
						stock:  product.stock,
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
	if(!data){
        return "<div> loading... </div>";
    }
	const Table = useCallback(TableHOC<DataType>(columns, data, "dashboard-product-box", "Danh sách sản phẩm", true, 6), [data]);
	const transitionDuration = {
		enter: 0.5,
		exit: 0.5,
	  };
	
	  const handleSearch = async (search: string) => {
		try {
			console.log(search);
		  const result = await axios.get(`http://localhost:8080/products/search/product-name=${search}`);
		  console.log(result.data);
		  setData(result.data.map((product: any) => {
			return {
			  photo: <img src={`https://${product.imageUrl}`} alt={product.category} />,
			  id: product.id,
			  name: product.name,
			  price:  formatCurrency(product.price),
			  stock:  product.stock,
			  action: `/admin/product/${product.id}`
			}}));
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className="admin-container" style={{color: "rgb(234, 236, 239)"}}>
			<AdminSidebar />
			<main className="products">{Table()}</main>
			<Link to="/admin/product/new" className="create-product-btn">
				<FaPlus />
			</Link>
			<Zoom
				timeout={transitionDuration}
				style={{
				transitionDelay: `${transitionDuration.exit}ms`,
				}}
				in={true}
				unmountOnExit>
				<Fab
				className={classes.fab}
				aria-label="search"
				onClick={openSearchModal}
				style={{ 
					backgroundColor: "rgb(252, 213, 53)",
					color: "rgb(24, 26, 32)",
					boxShadow: "0 20px 60px -2px rgba(27,33,58,.4)",
				}}
				>
				<SearchIcon />
				</Fab>
			</Zoom>
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
		 open={searchModal}
		 BackdropComponent={Backdrop}
		 BackdropProps={{
		   timeout: 500,
		 }}
      >
        <Fade in={searchModal}>
          <div className={classes.paper}>
            <SearchModal onClose={closeSearchModal} handleSearch={handleSearch}/>
          </div>
        </Fade>
      </Modal>
		</div>
	);
};

export default Products;
