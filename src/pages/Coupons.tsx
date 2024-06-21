/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import axios from "axios";
import SearchModal from "../components/SearchModal";
import { makeStyles } from "@material-ui/core/styles";
import { format } from 'date-fns';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SearchIcon from "@material-ui/icons/Search";
interface DataType {
    code: string;
    startDate: string;
    expirationDate: string;
    voucherTitle: string;
    discountValue: number;
    usageLimit: number;
    usageAmount: number;
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
        Header: "Code",
        accessor: "code"
    },
    {
        Header: "Tiêu đề",
        accessor: "voucherTitle"
    },
    {
        Header: "Giảm giá",
        accessor: "discountValue"
    },
    {
        Header: "Số lần sử dụng",
        accessor: "usageLimit"
    },
    {
        Header: "Số lần đã sử dụng",
        accessor: "usageAmount"
    },
    {
        Header: "Ngày bắt đầu",
        accessor: "startDate",
        Cell: ({ value }) => format(new Date(value), 'MM/dd/yyyy hh:mm a'),
    },
    {
        Header: "Ngày hết hạn",
        accessor: "expirationDate",
        Cell: ({ value }) => format(new Date(value), 'MM/dd/yyyy hh:mm a'),
    },
    
];

const Coupons = () => {
    const history = useNavigate();
    const [coupons, setCoupons] = useState<DataType[]>([]);
    const classes = useStyles();

    const [searchModal, setSearchModal] = useState(false);

    const openSearchModal = () => {
      setSearchModal(true);
    };
  
    const closeSearchModal = () => {
      setSearchModal(false);
    };
    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/coupons");
				console.log(data);
                const couponsData = data.map((customer: any) => ({
                    code: customer.code,
                    startDate: customer.startDate, 
                    expirationDate: customer.expirationDate,
                    voucherTitle: customer.voucherTitle,
                    discountValue: customer.discountValue,
                    usageLimit: customer.usageLimit,
                    usageAmount: customer.usageAmount
                }));
                setCoupons(couponsData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCoupons();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/coupon/${id}`);
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleView = (id: string) => {
        history(`/coupon/${id}`);
    };

    const Table = useCallback(TableHOC<DataType>(columns, coupons, "dashboard-product-box", "Danh sách khuyến mãi", true, 9), [coupons]);

    const transitionDuration = {
        enter: 0.5,
        exit: 0.5,
      };
    
    return (
        <div className="admin-container" style={{ color: "rgb(234, 236, 239)" }}>
            <AdminSidebar />
            <main>{Table()}</main>
        </div>
    );
};

export default Coupons;
