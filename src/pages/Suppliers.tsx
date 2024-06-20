import { ReactElement, useCallback, useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import SearchModal from "../components/SearchModal";

import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

interface SupplierType {
  // logo: ReactElement;
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  status: string;
  website: string;
}

const columns: Column<SupplierType>[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Contact",
    accessor: "contact",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Website",
    accessor: "website",
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

const Suppliers = () => {
  const [data, setData] = useState<SupplierType[]>([]);
  const classes = useStyles();
  const [searchModal, setSearchModal] = useState(false);

  const openSearchModal = () => {
    setSearchModal(true);
  };

  const closeSearchModal = () => {
    setSearchModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8080/suppliers");
        console.log(result.data);
        setData(result.data.map((supplier: any) => {
          return {
            // logo: <img src={`https://${supplier.supplierLogo}`} alt={supplier.supplierName} />,
            id: supplier.supplierID,
            name: supplier.supplierName,
            contact: supplier.contactName,
            phone: supplier.contactPhone,
            email: supplier.contactEmail,
            status: supplier.supplierStatus ? "Active" : "Inactive",
            website: <a href={supplier.supplierWebsite} target="_blank" rel="noopener noreferrer">{supplier.supplierWebsite}</a>,
          };
        }));
      } catch (err) {
        console.log(err);
        setData([]);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const Table = useCallback(TableHOC<SupplierType>(columns, data, "dashboard-product-box", "Danh sách nhà cung cấp", true), [data]);

  const transitionDuration = {
    enter: 0.5,
    exit: 0.5,
  };

  return (
    <div className="admin-container" style={{ color: "rgb(234, 236, 239)" }}>
      <AdminSidebar />
      <main>{Table()}</main>
      <Link to="/admin/supplier/new" className="create-product-btn">
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

export default Suppliers;
