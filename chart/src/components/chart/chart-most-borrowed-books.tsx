import React from 'react';
import useFetchApi from '../../utils/fetch-api';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { generateRandomColor } from '../../utils/generator.tsx';
import cfg from '../../config';

interface ChartProps {
  url: string;
}

interface JsonData {
  title: string;
  isbn: string;
  _count: {
    lending: number;
  };
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<{ data: JsonData[] }> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.title),
    datasets: [
      {
        ...cfg.CHART_PIE_DATASET,
        data: data.map((item) => item._count.lending),
        backgroundColor: data.map(() => generateRandomColor()),
      },
    ],
  };

  return (
    <div>
      <Doughnut data={chartData} options={cfg.CHART_PIE_OPT} />
    </div>
  );
};

const ChartMostBorrowedBooks: React.FC<ChartProps> = ({ url }) => {
  const { data, loading } = useFetchApi(url);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || !Array.isArray(data)) {
    return <p>Error: Invalid data structure.</p>;
  }

  return <PieChart data={data} />;
};

export default ChartMostBorrowedBooks;
