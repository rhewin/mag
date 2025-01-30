import './App.css';

import React from 'react';

import { TopbarForSidebarContentLayout } from './patterns/topbar-for-sidebar-content-layout';
import { MainPanelForSidebarContentLayout } from './patterns/mainpanel-for-sidebar-content-layout';
import { FixedWidthPrimarySidebar } from './patterns/fixed-width-primary-sidebar';

const App: React.FC = () => (
  <div className='blink-text-primary flex flex-col lg:flex-row h-screen bg-blinkGray50 dark:bg-blinkNeutral900 gap-0.5'>
    <FixedWidthPrimarySidebar />

    <div className='flex flex-1 h-full flex-col'>
      <TopbarForSidebarContentLayout />

      <MainPanelForSidebarContentLayout />
    </div>
  </div>
);

export default App;
