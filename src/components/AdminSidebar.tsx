/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiFillFileText } from "react-icons/ai";
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill} from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";
import { MdSupervisorAccount } from 'react-icons/md';

const AdminSidebar = () => {
	const location = useLocation();

	const [showModal, setShowModal] = useState<boolean>(false);
	const [phoneActive, setPhoneActive] = useState<boolean>(window.innerWidth < 1000);

	const resizeHandler = () => {
		setPhoneActive(window.innerWidth < 1000);
	};

	useEffect(() => {
		window.addEventListener("resize", resizeHandler);

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	return (
		<>
			{phoneActive && (
				<button id="hamburger" onClick={() => setShowModal(true)}>
					<HiMenuAlt4 />
				</button>
			)}

			<aside
				style={
					phoneActive
						? {
								width: "20rem",
								height: "100vh",
								position: "fixed",
								top: 0,
								left: showModal ? "0" : "-20rem",
								transition: "all 0.5s",
								color: "rgb(234, 236, 239)",
						  }
						: {
							color: "rgb(234, 236, 239)"
						}
				}
			>
				<h2 style={{color: "rgb(240, 185, 11)", fontWeight: "600"}}>Clothing Shop</h2>
				<DivOne location={location} />
				<DivTwo location={location} />
				<DivThree location={location} />
				<DivFour location={location} />
				<DivFive location={location} />

				{phoneActive && (
					<button id="close-sidebar" onClick={() => setShowModal(false)}>
						Close
					</button>
				)}
			</aside>
		</>
	);
};

const DivOne = ({ location }: { location: Location }) => (
	<div>
		<h5>Dashboard</h5>
		<ul>
			<Li url="/admin/dashboard" text="Dashboard" Icon={RiDashboardFill} location={location} />
			<Li url="/admin/chart/bar" text="Bar" Icon={FaChartBar} location={location} />
			<Li url="/admin/chart/pie" text="Pie" Icon={FaChartPie} location={location} />
			<Li url="/admin/chart/line" text="Line" Icon={FaChartLine} location={location} />
		</ul>
		{/* <ul>
			<Li url="/admin/product" text="Product" Icon={RiShoppingBag3Fill} location={location} />
			<Li url="/admin/customer" text="Customer" Icon={IoIosPeople} location={location} />
			<Li url="/admin/transaction" text="Transaction" Icon={AiFillFileText} location={location} />
			<Li url="/admin/supplier" text="Supplier" Icon={MdSupervisorAccount} location={location} />
		</ul> */}
	</div>
);

const DivTwo = ({ location }: { location: Location }) => (
	<div>
		<h5>Sản phẩm</h5>
		<ul>
			<Li url="/admin/products" text="Sản phầm" Icon={RiShoppingBag3Fill} location={location} />
			{/* <Li url="/admin/product/new" text="Nhập hàng" Icon={RiShoppingBag3Fill} location={location} /> */}
			<Li url="/admin/product/stock" text="Nhập kho" Icon={RiShoppingBag3Fill} location={location} />
			{/* <Li url="/admin/product/price" text="Giá sản phẩm" Icon={RiShoppingBag3Fill} location={location} /> */}
			<Li url="/admin/product/coupon" text="Khuyến mãi" Icon={RiShoppingBag3Fill} location={location} />
		</ul>
	</div>
);
const DivThree = ({ location }: { location: Location }) => (
	<div>
		<h5>Nhà cung cấp</h5>
		<ul>
			<Li url="/admin/supplier" text="Nhà cung cấp" Icon={MdSupervisorAccount} location={location} />
		</ul>
	</div>
);

const DivFour = ({ location }: { location: Location }) => (
	<div>
		<h5>Đơn hàng</h5>
		<ul>
			<Li url="/admin/transaction" text="Đơn hàng" Icon={AiFillFileText} location={location} />
		</ul>
	</div>
);

const DivFive = ({ location }: { location: Location }) => (
	<div>
		<h5>Khách hàng</h5>
		<ul>
			<Li url="/admin/customer" text="Khách hàng" Icon={IoIosPeople} location={location} />
		</ul>
	</div>
);


// const DivTwo = ({ location }: { location: Location }) => (
// 	<div>
// 		<h5>Charts</h5>
		
// 	</div>
// );

// const DivThree = ({ location }: { location: Location }) => (
// 	<div>
// 		{/* <h5>Apps</h5>s */}
// 		{/* <ul>
// 			<Li url="/admin/app/stopwatch" text="Stopwatch" Icon={FaStopwatch} location={location} />
// 			<Li url="/admin/app/coupon" text="Coupon" Icon={RiCoupon3Fill} location={location} />
// 			<Li url="/admin/app/toss" text="Toss" Icon={FaGamepad} location={location} />
// 		</ul> */}
// 	</div>
// );

interface LiProps {
	url: string;
	text: string;
	location: Location;
	Icon: IconType;
}
const Li = ({ url, text, location, Icon }: LiProps) => (
	<li
		style={{
			backgroundColor: location.pathname.includes(url) ? "rgb(240, 185, 11)" : "rgb(30, 35, 41)",
		}}
	>
		<Link
			to={url}
			style={{
				color: location.pathname.includes(url) ? "rgb(32, 38, 48)" : "rgb(234, 236, 239)",
			}}
		>
			<Icon />
			{text}
		</Link>
	</li>
);

export default AdminSidebar;
