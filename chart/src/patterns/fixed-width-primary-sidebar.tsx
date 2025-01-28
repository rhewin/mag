import { PrimarySidebar } from '../components/sidebar/sidebar-layouts';

import { PrimarySidebarBottomGroup } from '../patterns/primary-sidebar-bottom-group';
import { PrimarySidebarCreateButton } from '../patterns/primary-sidebar-create-button';
import { PrimarySidebarHeading } from '../patterns/primary-sidebar-heading';
import { PrimarySidebarPrimaryGroup } from '../patterns/primary-sidebar-primary-group';
import { PrimarySidebarSecondaryGroup } from '../patterns/primary-sidebar-secondary-group';

export const FixedWidthPrimarySidebar = () => {
  return (
    <PrimarySidebar>
      <PrimarySidebarHeading />

      <PrimarySidebarCreateButton />

      <PrimarySidebarPrimaryGroup />

      <PrimarySidebarSecondaryGroup />

      <div className='flex-grow' />

      <PrimarySidebarBottomGroup />
    </PrimarySidebar>
  );
};
