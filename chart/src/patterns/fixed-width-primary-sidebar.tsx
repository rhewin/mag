import { PrimarySidebar } from '../components/sidebar/sidebar-layouts';
import { PrimarySidebarHeading } from '../patterns/primary-sidebar-heading';
import { PrimarySidebarPrimaryGroup } from '../patterns/primary-sidebar-primary-group';

export const FixedWidthPrimarySidebar = () => {
  return (
    <PrimarySidebar>
      <PrimarySidebarHeading />

      <PrimarySidebarPrimaryGroup />

      <div className='flex-grow' />
    </PrimarySidebar>
  );
};
