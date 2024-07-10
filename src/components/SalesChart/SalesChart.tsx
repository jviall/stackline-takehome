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
} from "chart.js";
import { useAppSelector } from "../../redux/store";
import {
  selectRetailSalesData,
  selectSalesLabels,
  selectWholesaleSalesData,
} from "../../redux/selectors/salesSelectors";
import "chartjs-adapter-date-fns";
import "./SalesChart.css";
import { format } from "date-fns";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

function SalesChart() {
  const retailSalesData = useAppSelector(selectRetailSalesData);
  const wholesaleSalesData = useAppSelector(selectWholesaleSalesData);
  const salesLabels = useAppSelector(selectSalesLabels);

  const data = {
    labels: salesLabels,
    datasets: [
      {
        label: "Retail Sales",
        data: retailSalesData,
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.1,
      },
      {
        label: "Wholesale Sales",
        data: wholesaleSalesData,
        fill: false,
        backgroundColor: "rgba(153,102,255,1)",
        borderColor: "rgba(153,102,255,1)",
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
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
      <h3>Retail Sales</h3>
      <div className="chartContainer">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default SalesChart;
