import './App.css';

import React from 'react';

import { TopbarForSidebarContentLayout } from './patterns/topbar-for-sidebar-content-layout';
import { FixedWidthPrimarySidebar } from './patterns/fixed-width-primary-sidebar';

const App: React.FC = () => (
  <div className='blink-text-primary flex flex-col lg:flex-row h-screen bg-blinkGray50 dark:bg-blinkNeutral900 gap-0.5'>
    <FixedWidthPrimarySidebar />

    <div className='flex flex-1 h-full flex-col'>
      <TopbarForSidebarContentLayout />

      <div className='w-full h-full flex flex-col lg:flex-row'>
        <div className='flex flex-1 h-full overflow-y-auto flex-col p-6'>
          <div className='bg-blinkNeutral50 dark:bg-blinkNeutral800 flex-1 py-7 px-6 rounded-lg overflow-x-auto'>
            Content area
          </div>
        </div>

        <div className='flex flex-col gap-4 p-6 pt-0 lg:pt-6 lg:pl-0 w-full lg:w-80 flex-shrink-0'>
          <div className='bg-blinkNeutral50 dark:bg-blinkNeutral800 min-h-20 rounded-lg p-6'>
            some chart here
          </div>
          <div className='bg-blinkNeutral50 dark:bg-blinkNeutral800 min-h-20 rounded-lg p-6'>
            or some other widget
          </div>
          <div className='bg-blinkNeutral50 dark:bg-blinkNeutral800 min-h-20 rounded-lg p-6'>
            or even a mini-form
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
