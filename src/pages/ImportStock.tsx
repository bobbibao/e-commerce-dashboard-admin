import AdminSidebar from "../components/AdminSidebar";
import ImportProductStockForm from "../components/ImportProductStockForm";
const ImportStock = () => {
	return (
		<div className="admin-container" style={{color: "rgb(234, 236, 239)"}}>
			<AdminSidebar />
			<main >
                <ImportProductStockForm />
            </main>
		</div>
	);
};

export default ImportStock;
