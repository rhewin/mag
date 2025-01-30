import React from 'react';
import useFetchApi from '../../utils/fetch-api';
import cfg from '../../config';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  url: string;
}

interface JsonData {
  year: string;
  month: string;
  borrow_count: number;
}

const BarChart: React.FC<{ data: JsonData[] }> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => `${item.year}-${item.month}`), // Combine year and month
    datasets: [
      {
        ...cfg.CHART_BAR_DATASET,
        data: data.map((item) => item.borrow_count),
      },
    ],
  };

  return (
    <div>
      <Bar data={chartData} options={cfg.CHART_BAR_OPT} />
    </div>
  );
};

const ChartMonthlyLendingTrends: React.FC<ChartProps> = ({ url }) => {
  const { data, loading } = useFetchApi(url);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !Array.isArray(data)) {
    return <p>Error: Invalid data structure.</p>;
  }

  return <BarChart data={data} />;
};

export default ChartMonthlyLendingTrends;
