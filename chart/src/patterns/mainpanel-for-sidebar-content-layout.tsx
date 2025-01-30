import ChartMostBorrowedBooks from '../components/chart/chart-most-borrowed-books';
import ChartMonthlyLendingTrends from '../components/chart/chart-monthly-lending-trends';
import cfg from '../config';

export const MainPanelForSidebarContentLayout = () => {
  const urlMostBorrowedBooks = `${cfg.URL_REPORT_API}/most-borrowed-books?top=7`;
  const urlMonthlyLendingTrends = `${cfg.URL_REPORT_API}/monthly-lending-trends`;

  return (
    <div className='w-full h-full flex flex-col lg:flex-row'>
      <div className='flex flex-1 h-full overflow-y-auto flex-col p-6'>
        <div className='bg-blinkNeutral50 dark:bg-blinkNeutral800 flex-1 py-7 px-6 rounded-lg overflow-x-auto'>
          <h2>Top 7 Most Borrowed Books</h2>
          <br />
          <ChartMostBorrowedBooks url={urlMostBorrowedBooks} />
        </div>
      </div>

      <div className='flex flex-1 h-full overflow-y-auto flex-col p-6'>
        <div className='bg-blinkNeutral50 dark:bg-blinkNeutral800 flex-1 py-7 px-6 rounded-lg overflow-x-auto'>
          <h2>Monthly Lending Trends</h2>
          <br />
          <ChartMonthlyLendingTrends url={urlMonthlyLendingTrends} />
        </div>
      </div>
    </div>
  );
};
