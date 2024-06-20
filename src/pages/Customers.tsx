/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

interface DataType {
    id: string;
    name: string;
    email: string;
    gender: string;
    address: string;
    phone: string;
    active: string;
    role: string;
    action: ReactElement;
}

const columns: Column<DataType>[] = [
    // {
    //     Header: "Avatar",
    //     accessor: "avatar",
    // },
	{
		Header: "ID",
		accessor: "id",
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
    },{
        Header: "Hoạt động gần nhất",
        accessor: "active",
    },
    // {
    //     Header: "Action",
    //     accessor: "action",
    // },
];

const defaultAvatar = "https://i.pinimg.com/736x/f4/a3/4e/f4a34ef7fd2f8d3a347a8c0dfb73eece.jpg";

const Customers = () => {
    const history = useNavigate();
    const [customers, setCustomers] = useState<DataType[]>([]);

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
                    name: `${customer.name} ${customer.lastname}`,
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

    const Table = useCallback(TableHOC<DataType>(columns, customers, "dashboard-product-box", "Danh sách khách hàng", true), [customers]);

    return (
        <div className="admin-container" style={{ color: "rgb(234, 236, 239)" }}>
            <AdminSidebar />
            <main>{Table()}</main>
        </div>
    );
};

export default Customers;
