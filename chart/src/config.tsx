const chartBarOptions = {
  responsive: true,
  plugins: {
    title: {
      display: false,
      text: 'Monthly Lending Trends',
    },
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Borrow Amount',
      },
      beginAtZero: true,
    },
  },
};

const chartBarDataset = {
  label: 'Borrow Amount',
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)',
  ],
  borderColor: [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
  ],
  borderWidth: 1,
};

const chartPieOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'left' as const,
      align: 'center' as const,
      labels: {
        font: {
          size: 12,
          family: 'Arial',
          lineHeight: 1.2,
        },
        padding: 15,
        boxWidth: 20,
        boxHeight: 20,
        usePointStyle: true,
        pointStyle: 'rectRounded' as const,
      },
      title: {
        display: false,
        text: 'Most Borrowed Books',
      },
    },
  },
};

const chartPieDataset = {
  hoverOffset: 4,
};

export default {
  URL_REPORT_API: 'http://127.0.0.1:3000/v1/reports',
  CHART_BAR_OPT: chartBarOptions,
  CHART_BAR_DATASET: chartBarDataset,
  CHART_PIE_OPT: chartPieOptions,
  CHART_PIE_DATASET: chartPieDataset,
};
