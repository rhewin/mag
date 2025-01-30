import { DashboardIcon } from '../icons/dashboard-icon';
import { HomeIcon } from '../icons/home-icon';
import { SettingsIcon } from '../icons/settings-icon';
import { NavigationGroup } from '../components/sidebar/navigation-groups';
import { SidebarRegularItem } from '../components/sidebar/navigation-items';

export const PrimarySidebarPrimaryGroup = ({ ...props }) => {
  return (
    <NavigationGroup header='' {...props}>
      <SidebarRegularItem
        href='#'
        before={<HomeIcon className='w-8 h-8 sm:w-6 sm:h-6' />}
      >
        Home
      </SidebarRegularItem>
      <SidebarRegularItem
        href='#'
        before={<DashboardIcon className='w-8 h-8 sm:w-6 sm:h-6' />}
      >
        Profile
      </SidebarRegularItem>
      <SidebarRegularItem
        href='#'
        before={<SettingsIcon className='w-8 h-8 sm:w-6 sm:h-6' />}
      >
        Settings
      </SidebarRegularItem>
    </NavigationGroup>
  );
};
