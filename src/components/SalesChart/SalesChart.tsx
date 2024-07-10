import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
  ChartData,
} from "chart.js";
import { useAppSelector } from "../../redux/store";
import {
  selectRetailerMarginData,
  selectRetailSalesData,
  selectUnitsSoldData,
  selectWeekEndingDates,
  selectWholesaleSalesData,
} from "../../redux/selectors/salesSelectors";
import "chartjs-adapter-date-fns";
import "./SalesChart.css";
import { format } from "date-fns";
import { SalesData } from "../../types/Product";
import { useState } from "react";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

function SalesChart() {
  const retailSalesData = useAppSelector(selectRetailSalesData);
  const wholesaleSalesData = useAppSelector(selectWholesaleSalesData);
  const retailerMarginData = useAppSelector(selectRetailerMarginData);
  const unitsSoldData = useAppSelector(selectUnitsSoldData);
  const salesLabels = useAppSelector(selectWeekEndingDates);

  const [selectedDatasets, setSelectedDatasets] = useState<
    Record<keyof Omit<SalesData, "weekEnding">, boolean>
  >({
    retailSales: true,
    wholesaleSales: false,
    retailerMargin: false,
    unitsSold: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const selectedCount =
      Object.values(selectedDatasets).filter(Boolean).length;
    if (!checked && selectedCount <= 1) return; // Prevent deselecting the last dataset

    setSelectedDatasets({
      ...selectedDatasets,
      [name]: checked,
    });
  };

  const selectedLabels = Object.keys(selectedDatasets)
    .filter((key) => selectedDatasets[key as keyof typeof selectedDatasets])
    .map((key) =>
      key
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^\w/, (c) => c.toUpperCase())
    )
    .join(", ");

  const data = {
    labels: salesLabels,
    datasets: [
      selectedDatasets.retailSales && {
        label: "Retail Sales",
        data: retailSalesData,
        fill: false,
        backgroundColor: "#AEC6CF",
        borderColor: "#AEC6CF",
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.1,
      },
      selectedDatasets.wholesaleSales && {
        label: "Wholesale Sales",
        data: wholesaleSalesData,
        fill: false,
        backgroundColor: "#77DD77",
        borderColor: "#77DD77",
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.1,
      },
      selectedDatasets.retailerMargin && {
        label: "Retailer Margin",
        data: retailerMarginData,
        fill: false,
        backgroundColor: "#CFCFC4",
        borderColor: "#CFCFC4",
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.1,
      },
      selectedDatasets.unitsSold && {
        label: "Units Sold",
        data: unitsSoldData,
        fill: false,
        backgroundColor: "#FFB7B2",
        borderColor: "#FFB7B2",
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.1,
      },
    ].filter(Boolean),
  } as ChartData<
    "line",
    {
      x: Date;
      y: number;
    }[],
    Date
  >;

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          displayFormats: {
            month: "MMM",
          },
        },
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            return format(salesLabels[context[0].dataIndex], "MMM dd, yyyy");
          },
        },
      },
    },
  };

  return (
    <div className="salesChart">
      <h3>{selectedLabels}</h3>
      <div className="chartContainer">
        <Line data={data} options={options} />
      </div>
      <div className="checkboxContainer">
        <label>
          <input
            type="checkbox"
            name="retailSales"
            checked={selectedDatasets.retailSales}
            onChange={handleCheckboxChange}
            disabled={
              selectedDatasets.retailSales &&
              Object.values(selectedDatasets).filter(Boolean).length === 1
            }
          />
          Retail Sales
        </label>
        <label>
          <input
            type="checkbox"
            name="wholesaleSales"
            checked={selectedDatasets.wholesaleSales}
            onChange={handleCheckboxChange}
            disabled={
              selectedDatasets.wholesaleSales &&
              Object.values(selectedDatasets).filter(Boolean).length === 1
            }
          />
          Wholesale Sales
        </label>
        <label>
          <input
            type="checkbox"
            name="retailerMargin"
            checked={selectedDatasets.retailerMargin}
            onChange={handleCheckboxChange}
            disabled={
              selectedDatasets.retailerMargin &&
              Object.values(selectedDatasets).filter(Boolean).length === 1
            }
          />
          Retailer Margin
        </label>
        <label>
          <input
            type="checkbox"
            name="unitsSold"
            checked={selectedDatasets.unitsSold}
            onChange={handleCheckboxChange}
            disabled={
              selectedDatasets.unitsSold &&
              Object.values(selectedDatasets).filter(Boolean).length === 1
            }
          />
          Units Sold
        </label>
      </div>
    </div>
  );
}

export default SalesChart;
