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
        text: 'Borrow Count',
      },
      beginAtZero: true,
    },
  },
};

const chartBarDataset = {
  label: 'Borrow Amount',
  backgroundColor: '#36A2EB',
  borderColor: '#36A2EB',
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
