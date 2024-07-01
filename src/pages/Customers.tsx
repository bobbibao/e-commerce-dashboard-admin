/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import axios from "axios";
import SearchModal from "../components/SearchModal";
import { makeStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SearchIcon from "@material-ui/icons/Search";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface DataType {
    id: string;
    lastname: string;
    name: string;
    email: string;
    gender: string;
    address: string;
    phone: string;
    active: string;
    role: string;
    action: ReactElement;
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
    // {
    //     Header: "Avatar",
    //     accessor: "avatar",
    // },
	{
		Header: "ID",
		accessor: "id",
	},{
        Header: "Họ",
        accessor: "lastname",
    },
    {
        Header: "Tên",
        accessor: "name",
    },
    {
        Header: "Email",
        accessor: "email",
    },
    {
        Header: "Giới tính",
        accessor: "gender",
    },
    {
        Header: "Địa chỉ",
        accessor: "address",
    },
    {
        Header: "Số điện thoại",
        accessor: "phone",
    },
    {
        Header: "Role",
        accessor: "role",
		Cell: ({ row }: { row: { original: DataType } }) => {
            const [role, setRole] = useState(row.original.role);

            const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
                const newRole = e.target.value;
                setRole(newRole);
                try {
                    await axios.put(`http://localhost:8080/user/${row.original.id}/role`, { role: newRole });
                    toast.success("Đã cập nhật role cho user");
                } catch (error) {
                    console.log(error);
                }
            };

            return (
                <select value={role} onChange={handleRoleChange} style={{
					backgroundColor: "rgb(234, 236, 239)",
					color: "black",
					border: "none",
					padding: "5px",
					borderRadius: "5px",
				
				}}>
					<option value="User">User</option>
					<option value="Admin">Admin</option>
                </select>
            );
        },
    },
    // {
    //     Header: "Hoạt động gần nhất",
    //     accessor: "active",
    // },
    // {
    //     Header: "Action",
    //     accessor: "action",
    // },
];

const defaultAvatar = "https://i.pinimg.com/736x/f4/a3/4e/f4a34ef7fd2f8d3a347a8c0dfb73eece.jpg";

const Customers = () => {
    const classes = useStyles();
    const history = useNavigate();
    const [customers, setCustomers] = useState<DataType[]>([]);
    const [searchModal, setSearchModal] = useState(false);
  
    const openSearchModal = () => {
      setSearchModal(true);
    };
  
    const closeSearchModal = () => {
      setSearchModal(false);
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/user");
				console.log(data);
                const customersData = data.map((customer: any) => ({
                    avatar: (
                        <img
                            src={customer.avatar || defaultAvatar}
                            style={{ borderRadius: "50%" }}
                            alt="profile image"
                        />
                    ),
					id: customer.id,
                    lastname: ` ${customer.name}`,
                    name: `${customer.lastname}`,
                    email: customer.email,
                    gender: customer.gender || "Not specified",
                    address: customer.adress,
                    phone: customer.phone,
                    role: customer.role || "User",
                    action: `/admin/user/${customer.id}`
                }));
                setCustomers(customersData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCustomers();
    }, []);

    const transitionDuration = {
        enter: 0.5,
        exit: 0.5,
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/user/${id}`);
            setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleView = (id: string) => {
        history(`/customer/${id}`);
    };

    const Table = useCallback(TableHOC<DataType>(columns, customers, "dashboard-product-box", "Danh sách khách hàng", true, 9), [customers]);

    return (
        <div className="admin-container" style={{ color: "rgb(234, 236, 239)" }}>
            <AdminSidebar />
            <main>{Table()}</main>
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
              <ToastContainer />

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
                <SearchModal onClose={closeSearchModal} />
            </div>
            </Fade>
        </Modal>
        </div>
    );
};

export default Customers;
