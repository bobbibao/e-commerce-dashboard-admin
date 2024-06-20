import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

// ** pages lazy import
const HomePage = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Customers = lazy(() => import("./pages/Customers"));
const Products = lazy(() => import("./pages/Products"));
const Suppliers = lazy(() => import("./pages/Suppliers"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Coupons = lazy(() => import("./pages/Coupons"));
const ProductManagemnet = lazy(() => import("./pages/management/ProductManagemnet"));
const TransactionManagement = lazy(() => import("./pages/management/TransactionManagement"));
const NewProduct = lazy(() => import("./pages/management/NewProduct"));
const BarCharts = lazy(() => import("./pages/charts/BarCharts"));
const PieCharts = lazy(() => import("./pages/charts/PieCharts"));
const LineCharts = lazy(() => import("./pages/charts/LineCharts"));
const Coupon = lazy(() => import("./pages/apps/Coupons"));
const Toss = lazy(() => import("./pages/apps/Toss"));
const StopWatch = lazy(() => import("./pages/apps/StopWatch"));
const ImportStock = lazy(() => import("./pages/ImportStock"));

const App = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/admin/dashboard" element={<Dashboard />} />
					<Route path="/admin/products" element={<Products />} />
					<Route path="/admin/transaction" element={<Transactions />} />
					<Route path="/admin/customer" element={<Customers />} />
					<Route path="/admin/supplier" element={<Suppliers />} />

					{/* charts */}
					<Route path="/admin/chart/bar" element={<BarCharts />} />
					<Route path="/admin/chart/pie" element={<PieCharts />} />
					<Route path="/admin/chart/line" element={<LineCharts />} />

					{/* apps */}
					<Route path="/admin/app/coupon" element={<Coupons />} />
					<Route path="/admin/app/toss" element={<Toss />} />
					<Route path="/admin/app/stopwatch" element={<StopWatch />} />

					{/* management */}
					<Route path="/admin/product/stock" element={<ImportStock />} />
					<Route path="/admin/product/coupon" element={<Coupons />} />
					<Route path="/admin/product/new" element={<NewProduct />} />
					<Route path="/admin/product/:id" element={<ProductManagemnet />} />
					<Route path="/admin/transaction/:id" element={<TransactionManagement />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
