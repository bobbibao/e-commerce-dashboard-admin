/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import axios from "axios";

interface DataType {
    code: string;
    startDate: string;
    expirationDate: string;
    voucherTitle: string;
    discountValue: number;
    usageLimit: number;
    usageAmount: number;
}

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
        accessor: "startDate"
    },
    {
        Header: "Ngày hết hạn",
        accessor: "expirationDate"
    },
    
];

const Coupons = () => {
    const history = useNavigate();
    const [coupons, setCoupons] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/coupon");
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

    const Table = useCallback(TableHOC<DataType>(columns, coupons, "dashboard-product-box", "Danh sách khuyến mãi", true), [coupons]);

    return (
        <div className="admin-container" style={{ color: "rgb(234, 236, 239)" }}>
            <AdminSidebar />
            <main>{Table()}</main>
        </div>
    );
};

export default Coupons;
