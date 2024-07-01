import AdminSidebar from "../components/AdminSidebar";
import { BsSearch } from "react-icons/bs";
import { BiMaleFemale } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import userImg from "../assets/userImage.png";
import data from "../assets/data.json";
import { BarChart, DougnutChart } from "../components/Charts";
import DashBoardTable from "../components/DashBoardTable";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
	const [hover, setHover] = useState(false);
	const [countGender, setCountGender] = useState([]);
	const [countCategory, setCountCategory] = useState([
		{
			heading: "",
			value: 0,
		}
	]);
	
	const toggleHover = () => {
		setHover(!hover);
	};

	const style = {
		borderBottomColor: hover ? 'rgb(240, 185, 11)' : 'rgb(57, 57, 57)',
	};

	useEffect(() => {
		axios.get('http://localhost:8080/api/dashboard/count-genders')
			.then(res => {
				// [{gender: "F", count: 15}, {gender: "M", count: 18}] (2)
				const data = res.data;
				const count = data.map((item) => item.count);
				// console.log(count);
				setCountGender(count);
			})
			.catch(err => {
				console.log(err);
			});

		// axios.get('http://localhost:8080/api/dashboard/count-by-gender?gender=M')
		// 	.then(res => {
		// 		console.log(res.data);
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});

		axios.get('http://localhost:8080/api/dashboard/count-product-by-category')
			.then(res => {
				const data = res.data;
				console.log(data);
				setCountCategory(
					data.map((category) => {
						return {
							heading: category.category,
							value: (category.stock / (category.stock + category.sold) * 100).toFixed(0),
						};
					})
				);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
	return (
		<div className="admin-container">
			<AdminSidebar />
			<main className="dashboard" style={{color: "rgb(234, 236, 239)"}}>
			<div className="bar" style={style}>
					<BsSearch />
					<input type="text" placeholder="Search for data, users, docs" />
					<FaRegBell />
					<img src={userImg} alt="user iamge" />
				</div>
				<section className="widget-container">
					<WidgetItem percent={40} value={340000} heading="Revenue" color="rgba(0,115,255)" />
					<WidgetItem percent={-14} value={400} heading="Users" color="rgba(0,198,202)" />
					<WidgetItem percent={80} value={23000} heading="Transactions" color="rgba(0,115,255)" />
					<WidgetItem percent={30} value={1000} heading="Products" color="rgba(276, 20, 255)" />
				</section>
				<section className="graph-container">
					<div className="revenue-chart">
						<h2>Revenue & Transaction</h2>
						<BarChart
							data_1={[300, 144, 433, 655, 237, 755, 190]}
							data_2={[200, 444, 343, 556, 778, 455, 990]}
							title_1="Revenue"
							title_2="Transaction"
							bgColor_1="rgb(0,115,255"
							bgColor_2="rgba(53,162,235,0.8)"
						/>
					</div>
					<div className="dashboard-categories">
						<h2>Inventory</h2>
						<div>
							{countCategory.map((category, index) => (
								console.log(category),
								<CategoryItem
									key={index}
									heading={category.heading}
									value={category.value}
									color={`hsl(${category.value * 4},${category.value}%,50%)`}
								/>
							))}
						</div>
					</div>
				</section>
				<section className="transaction-container">
					<div className="gender-chart">
						<h2>Gender Ratio</h2>
						<DougnutChart labels={["Female", "Male"]} data={countGender} backgroundColor={["hsl(340,82%,56%", "rgba(53,162,235,0.8)"]} />
						<p style={{color: "rgb(234, 236, 239)"}}>
							<BiMaleFemale />
						</p>
					</div>
					<DashBoardTable data={data.transaction} />
				</section>
			</main>
		</div>
	);
};

interface WidgetItemProps {
	heading: string;
	value: number;
	percent: number;
	color: string;
	amount?: boolean;
}

const WidgetItem = ({ heading, value, percent, color, amount }: WidgetItemProps) => (
	<article className="widget">
		<div className="widget-info">
			<p>{heading}</p>
			<h4>{amount ? `$${value}` : value}</h4>
			{percent > 0 ? (
				<span className="green">
					<HiTrendingUp /> + {percent}%
				</span>
			) : (
				<span className="red">
					<HiTrendingDown /> {percent}%
				</span>
			)}
		</div>
		<div
			className="widget-circle"
			style={{
				background: `conic-gradient(${color} ${Math.abs((percent / 100) * 360)}deg,rgb(255,255,255) 0)`,
			}}
		>
			<span style={{ color: `${color}` }}>{percent}%</span>
		</div>
	</article>
);

interface CategoryItemProps {
	color: string;
	value: number;
	heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
	<div className="category-item">
		<h5>{heading}</h5>
		<div>
			<div
				style={{
					backgroundColor: color,
					width: `${value}%`,
				}}
			></div>
		</div>
		<span>{value}%</span>
	</div>
);

export default Dashboard;
