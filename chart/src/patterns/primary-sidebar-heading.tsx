import { SidebarHeading } from '../components/sidebar/navigation-items';

export const PrimarySidebarHeading = () => {
  return (
    <SidebarHeading>
      <span className='font-medium text-xl'>Navigation</span>
    </SidebarHeading>
  );
};

export const PrimarySidebarHeading2 = () => {
  return (
    <SidebarHeading className='lg:pr-8'>
      <span className='font-medium text-xl'>Settings</span>
    </SidebarHeading>
  );
};
