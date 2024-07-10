import ProductDetails from "../ProductDetails/ProductDetails";
import SalesChart from "../SalesChart/SalesChart";
import SalesTable from "../SalesTable/SalesTable";
import Header from "../Header/Header";
import { useEffect } from "react";
import { fetchProductData } from "../../redux/actions/productActions";
import { useAppDispatch } from "../../redux/store";

import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <div className="container">
        <div>
          <ProductDetails />
        </div>
        <div className="mainContent">
          <SalesChart />
          <SalesTable />
        </div>
      </div>
    </div>
  );
}

export default App;
